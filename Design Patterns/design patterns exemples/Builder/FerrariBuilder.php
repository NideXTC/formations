<?php


class FerrariBuilder implements BuilderInterface
{

    protected $car;

    /**
     * @return void
     */
    public function addDoors()
    {
        $this->car->setPart('Porte de gauche en platine', new Door());
        $this->car->setPart('Porte de droite en platine', new Door());
    }

    /**
     * @return void
     */
    public function addEngine()
    {
        $this->car->setPart('Moteur 500cc', new Engine());
    }


    public function createVehicle()
    {
        $this->car = new Car();
    }


    public function getVehicle()
    {
        return $this->car;
    }
}