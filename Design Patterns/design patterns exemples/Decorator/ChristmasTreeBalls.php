<?php


class ChristmasTreeBalls extends ChristmasTreeDecorator
{
    private $tree;

    public function __construct(ChristmasTreeDecorator $decorator)
    {
        $this->tree = $decorator;
    }

    function addBalls()
    {
        $this->tree->description = $this->tree->description . " avec des boules rouges brillantes ";
    }
}