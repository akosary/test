<?php
require_once('base.php');

class Furniture extends Product
{
    private $height;
    private $width;
    private $length;

    public function __construct($data) {
        $name=$data['name'];
        $SKU=$data['SKU'];
        $price=$data['price'];
        $type=$data['type'];
        $type=$data['type'];
        $height=$data['height'];
        $width=$data['width'];
        $length=$data['length'];
        parent::__construct($name,$SKU,$price,$type);
        $this->height=$height;
        $this->width=$width;
        $this->length=$length;
    }

    public function display() {
        return [
            'name' => $this->getName(),
            'sku' => $this->getSKU(),
            'price' => $this->getPrice(),
            'height' => $this->height,
            'width' => $this->width,
            'length' => $this->length,
        ];
    }
    public function insert($connection){
        try {
            $name=$this->getName();
            $SKU=$this->getSKU();
            $price=$this->getPrice();
            $type=$this->getType();
            $height=$this->height;
            $width=$this->width;
            $length=$this->length;
            $type_query = "INSERT INTO product_type (type,height,width,length) VALUES (:type,:height,:width,:length)";
            $getTypeId = "SELECT LAST_INSERT_ID() as id FROM product_type";
            $productQuery = "INSERT INTO products (SKU, name, price, type_id) 
            VALUES (:SKU, :name, :price, :type_id)";

            $connection->beginTransaction();
            try {
                $typeStatement = $connection->prepare($type_query);
                $typeStatement->bindParam(':height', $height);
                $typeStatement->bindParam(':width', $width);
                $typeStatement->bindParam(':length', $length);
                $typeStatement->bindParam(':type', $type);
                $typeStatement->execute();
    
                // Get the ID of the inserted row in 'book_pages' table
                $getIdStatement = $connection->prepare($getTypeId);
                $getIdStatement->execute();
                $typeId = $getIdStatement->fetch(PDO::FETCH_ASSOC)['id'];
    
                // Insert the product into the 'products' table along with the 'pages_id'
                $productStatement = $connection->prepare($productQuery);
                $productStatement->bindParam(':SKU', $SKU);
                $productStatement->bindParam(':name', $name);
                $productStatement->bindParam(':price', $price);
                $productStatement->bindParam(':type_id', $typeId);
                $productStatement->execute();
                // Commit the transaction if everything was successful
                $connection->commit();
                echo json_encode(['message' => 'Furniture product inserted successfully']);
            } catch (Exception $e) {
                $connection->rollBack();
                echo json_encode(['error' => 'Error inserting furniture product: ' . $e->getMessage()]);
            }
            
        } catch (Exception $e) {
            echo json_encode(['error' => 'Error in furniture data: ' . $e->getMessage()]);
        }
    }

}