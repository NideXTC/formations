<?php


abstract class Leaf
{
    private $_color;

    /**
     * Leaf constructor.
     * @param $_color
     */
    public function __construct($_color)
    {
        $this->_color = $_color;
    }

    /**
     * @return mixed
     */
    public function getColor()
    {
        return $this->_color;
    }

    /**
     * @param mixed $color
     * @return $this
     */
    public function setColor($color)
    {
        $this->_color = $color;
        return $this;
    }

}