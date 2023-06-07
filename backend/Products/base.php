<?php

abstract class Product
{
    protected $SKU;
    protected $name;
    protected $price;
    protected $type;
    public function __construct($name,$SKU,$price,$type)
    {
        $this->name = $name;
        $this->SKU = $SKU;
        $this->price = $price;
        $this->type = $type;
    }

    // Setters
    public function setSKU($sku)
    {
        $this->SKU = $sku;
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    public function setPrice($price)
    {
        $this->price = $price;
    }
    public function setType($type)
    {
        $this->type = $type;
    }

    // Getters
    public function getSKU()
    {
        return $this->SKU;
    }
    
    public function getName()
    {
        return $this->name;
    }
    
    public function getPrice()
    {
        return $this->price;
    }
    
    public function getType()
    {
        return $this->type;
    }
    
    // Database methods
    abstract public function insert($connection);
    // abstract public function update();
    // abstract public function delete();
    abstract public function display();
    
}


?>