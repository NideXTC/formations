<?php


class Product
{
    private $_name;
    private $_price;

    /**
     * Product constructor.
     * @param $_name
     * @param $_price
     */
    public function __construct($_name, $_price)
    {
        $this->_name = $_name;
        $this->_price = $_price;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->_price;
    }

    /**
     * @param mixed $price
     */
    public function setPrice($price)
    {
        $this->_price = $price;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->_name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->_name = $name;
    }

    public function hydrate($array)
    {
        $this->_name = $array[0];
        $this->_price = $array[1];
    }
}