<?php

class ChristmasTree
{
    private $color;
    private $height;
    private $description;

    public function __construct($color, $height)
    {
        $this->color = $color;
        $this->height = $height;
        $this->description = 'Un sapin de noël ' . $color . ' de ' . $height . 'm de haut';
    }

    public function getColor()
    {
        return $this->color;
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