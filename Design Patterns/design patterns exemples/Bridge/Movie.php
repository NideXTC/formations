<?php

class Movie
{
    private $_name;

    public function __construct($name)
    {
        $this->_name = $name;
    }

    public function getName()
    {
        return $this->_name;
    }

}