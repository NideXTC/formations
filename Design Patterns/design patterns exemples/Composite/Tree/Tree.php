<?php


class Tree extends Leaf
{
    private $_array;

    public function __construct()
    {
    }

    public function addLeaf(Leaf $leaf)
    {
        $this->_array[] = $leaf;
    }

    public function getCount()
    {
        return sizeof($this->_array);
    }

    public function getColor()
    {
        // Retourner toutes les couleurs
    }
}










