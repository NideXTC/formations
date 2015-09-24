<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

require 'Equide.php';

$horse = new Equide(4, 'rouge', 2);

$horse->setHead(1)
    ->setColor('brown')
    ->setLegs(3);


echo '<pre>';
var_dump($horse);
echo '</pre>';

$myLittlePony = new Equide(4, 'black', 1);

echo '<pre>';
var_dump($myLittlePony);
echo '</pre>';
