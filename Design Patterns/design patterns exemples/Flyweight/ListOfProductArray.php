<?php


class ListOfProductArray
{
    private $_array;

    public function __construct()
    {
        for ($i = 0; $i < 10; $i++) {
            $this->_array[] = ['Product' . $i, rand(10, 5985)];
        }
    }

    public function fetchAll()
    {
        return $this->_array;
    }

}