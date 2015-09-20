<?php

class PotatoAdapter
{

    private $potato;

    public function __construct(Potato $potato)
    {
        $this->potato = $potato;
    }

    public function cook()
    {
        $this->potato->fry();
    }
}