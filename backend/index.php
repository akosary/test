<?php
require('./main.php');


$sql = 'SELECT p.SKU,p.name,p.price,pt.size,pt.type,pt.height,pt.width,pt.length,pt.weight
FROM products p
JOIN product_type pt ON p.type_id = pt.id;
';
$object = new Main( $connection,$sql);
$object->getData();