<?php

class ChristmasTree
{
    private $height;
    private $description;

    public function __construct( $height)
    {
        $this->height = $height;
        $this->description = 'Un sapin de noël ' . $color . ' de ' . $height . 'm de haut';
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function getDescription()
    {
        return $this->description;
    }

}