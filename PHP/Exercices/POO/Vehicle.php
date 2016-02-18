<?php

abstract class Vehicle
{

    /**
     * Vehicle constructor.
     */
    public function __construct()
    {
        echo 'Vehicule' . PHP_EOL;
    }

    public function toto()
    {
        echo 'toto';
    }

    public abstract function mandatory();
}
