<?php

require 'Human.php';
require 'Child.php';
require 'Father.php';
require 'Mother.php';
require 'Family.php';


$mother = new Mother('Martine', 'F', 34);
$father = new Father('Jean', 'M', 35);
$child = new Child('Josay', 'M', 12);
$family = new Family();


$family
    ->addMember($mother)
    ->addMember($father)
    ->addMember($child);

echo '<pre>';
var_dump($family);
echo '</pre>';

echo 'Nombre : ' . $family->getCount();

echo '<br>';

echo 'Somme de l\'age : ' . $family->getAgeSum();

