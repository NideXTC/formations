<?php

require 'BuilderInterface.php';
require 'Director.php';
require 'Vehicle.php';
require 'Car.php';
require 'Door.php';
require 'Engine.php';
require 'FerrariBuilder.php';

$director = new Director();
$ferrari = new FerrariBuilder();

var_dump($director->build($ferrari));

