<?php
require('env.php');

$sql = DATABASE . ':host=' . DATABASE_host . ';dbname=' . DATABASE_name . ';port='. PORT;
try {
    $connection = new PDO($sql, DATABASE_username, DATABASE_password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo 'Connected successfully';
} catch(PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}