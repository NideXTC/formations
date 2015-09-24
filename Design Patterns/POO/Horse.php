<?php

class Horse extends Equide
{
    private $height;

    /**
     * Horse constructor.
     * @param $height
     */
    public function __construct($height)
    {
        parent::__construct(4, 'brown', 1);
        $this->height = $height;
        echo "CHEVAL";
    }


}