<?php


class ChristmasTreeDecorator
{
    protected $christmasTree;
    protected $description;

    public function __construct(ChristmasTree $christmasTree)
    {
        $this->christmasTree = $christmasTree;
        $this->resetDescription();
    }

    function resetDescription()
    {
        $this->description = $this->christmasTree->getDescription();
    }

    function getDescription()
    {
        return $this->description;
    }
}