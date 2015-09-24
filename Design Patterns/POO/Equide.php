<?php

class Equide
{
    protected $_legs;
    protected $_color;
    protected $_head;

    /**
     * Equide constructor.
     * @param $_legs
     * @param $_color
     * @param $_head
     */
    public function __construct($_legs, $_color, $_head)
    {
        $this->_legs = $_legs;
        $this->_color = $_color;
        $this->_head = $_head;

        echo  'Equide';
    }

    /**
     * @return mixed
     */
    public function getLegs()
    {
        return $this->_legs;
    }

    /**
     * @param mixed $legs
     * @return $this
     */
    public function setLegs($legs)
    {
        $this->_legs = $legs;
        return $this;
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

    /**
     * @return mixed
     */
    public function getHead()
    {
        return $this->_head;
    }

    /**
     * @param mixed $head
     * @return $this
     */
    public function setHead($head)
    {
        $this->_head = $head;
        return $this;
    }
}
