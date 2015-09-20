<?php


interface BuilderInterface
{
    public function createVehicle();

    public function addEngine();

    public function addDoors();

    public function getVehicle();
}