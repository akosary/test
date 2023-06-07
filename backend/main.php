<?php
require('./Connection/connection.php');
require('./Products/bookProduct.php');
require('./Products/DVDProduct.php');
require('./Products/furnitureProduct.php');

class Main {
    private $query;
    private $connection;
    private $productTypes;

    public function __construct($connection,$query = null ) {
        $this->query = $query;
        $this->connection = $connection;
        $this->productTypes = [
            'DVD' => DVD::class,
            'Book' => Book::class,
            'Furniture' => Furniture::class,
        ];
    }

    private function sqlPrepare() {
        $sql = $this->connection->prepare($this->query);
        $result = $sql->execute();
        try {
            return $sql;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function getData() {
        try {
            $sql = $this->sqlPrepare();
            $products = $sql->fetchAll(PDO::FETCH_ASSOC);
            $filteredProducts = array_map(function($product) {
                return array_filter($product, function($value) {
                    return $value != 0;
                });
            }, $products);
            echo json_encode($filteredProducts);
        } catch (Exception $e) {
            echo json_encode(['Error' => $e->getMessage()]);
        }
    }

    public function insertData($productData) {
        try {
            $requestData = json_decode($productData, true);
            $productType = $requestData['type'];
            if (isset($this->productTypes[$productType])) {
                $productClass = $this->productTypes[$productType];
                $product = new $productClass($requestData);
                $product->insert($this->connection);
            }else{
                echo json_encode(['Error' => "No Product with that name"]);
            }
        } catch (Exception $e) {
            echo json_encode(['Error' => $e->getMessage()]);
        }
    }

    public function removeData($data){
        try {
            $requestData = json_decode($data, true);
            // var_dump($requestData['IDs']);
            // foreach ($requestData['IDs'] as $Id) {
            //     // echo $Id;
            // }
            // $productIDsString = implode(',', $requestData['IDs']);            

            $productIDsString = implode(', ', array_map(function ($item) {
                return "'" . $item . "'";
            }, $requestData['IDs']));

            $deleteQuery = "DELETE FROM products WHERE SKU IN ($productIDsString)";
            $deleteStatement = $this->connection->prepare($deleteQuery);
            $result=  $deleteStatement->execute();
            
            if($result){
                echo json_encode(['message' => 'Products deleted successfully']);
            }else{
                echo json_encode(['message' => 'Failed to delete products']);
            }
            
        } catch (Exception $e) {
            echo json_encode(['Error' => $e->getMessage()]);
        }
    }
};


