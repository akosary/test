<?php
// header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: http://ecommercescanditest.000.pe');

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require('./main.php');

$object = new Main( $connection);
// $object->removeData($_POST);
$jsonData = file_get_contents('php://input');

$object->removeData($jsonData);