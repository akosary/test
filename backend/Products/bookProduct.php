<?php
require_once('base.php');

class Book extends Product
{
    private $weight;

    public function __construct($data) {
        $name=$data['name'];
        $SKU=$data['SKU'];
        $price=$data['price'];
        $type=$data['type'];
        $weight=$data['weight'];
        $type=$data['type'];
        parent::__construct($name,$SKU,$price,$type);
        $this->weight=$weight;
    }

    public function display() {
        return [
            'name' => $this->getName(),
            'SKU' => $this->getSKU(),
            'price' => $this->getPrice(),
            'weight' => $this->weight,
        ];
    }

    public function insert($connection){
        try {
            $name=$this->getName();
            $SKU=$this->getSKU();
            $price=$this->getPrice();
            $type=$this->getType();
            $weight=$this->weight;
            $type_query = "INSERT INTO product_type (type,weight) VALUES (:type,:weight)";
            $getTypeId = "SELECT LAST_INSERT_ID() as id FROM product_type";
            $productQuery = "INSERT INTO products (SKU, name, price, type_id) 
            VALUES (:SKU, :name, :price, :type_id)";

            $connection->beginTransaction();
            try {
                $typeStatement = $connection->prepare($type_query);
                $typeStatement->bindParam(':weight', $weight);
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
                echo json_encode(['message' => 'Book product inserted successfully']);
            } catch (Exception $e) {
                $connection->rollBack();
                echo json_encode(['error' => 'Error inserting book product: ' . $e->getMessage()]);
            }
            
        } catch (Exception $e) {
            echo json_encode(['error' => 'Error in book data: ' . $e->getMessage()]);
        }
    }
}