<?php

/**
 * Class Car - FACADE
 */
class Car
{
    private $wheel;
    private $engine;

    public function __construct()
    {
        $this->wheel = new Wheel();
        $this->engine = new Engine();
    }

    public function startAndStop()
    {
        $this->engine->start();
        $this->engine->stop();
    }

    public function rollAndDrift()
    {
        $this->wheel->roll();
        $this->wheel->drift();
    }

}