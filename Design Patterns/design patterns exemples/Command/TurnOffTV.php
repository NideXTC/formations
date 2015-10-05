<?php

class TurnOffTV implements TVInterface
{
    private $TVControl;

    public function __construct(TVControl $TVControl)
    {
        $this->TVControl = $TVControl;
    }

    public function execute()
    {
        $this->TVControl->turnOff();
    }
}