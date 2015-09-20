<?php

class ChristmasTreeStar extends ChristmasTreeDecorator
{
    private $tree;

    public function __construct(ChristmasTreeDecorator $decorator)
    {
        $this->tree = $decorator;
    }

    function addStar()
    {
        $this->tree->description = $this->tree->description . " et une étoile en or au dessus ";
    }
}