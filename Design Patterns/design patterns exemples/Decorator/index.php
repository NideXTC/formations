<?php
header('Content-Type: text/html; charset=utf-8');

require 'ChristmasTree.php';
require 'ChristmasTreeDecorator.php';
require 'ChristmasTreeBalls.php';
require 'ChristmasTreeStar.php';

$christmasTree = new ChristmasTree('vert', '20');
echo $christmasTree->getDescription();

echo '<br>';

//Décorons cette arbre maintenant

$decorator = new ChristmasTreeDecorator($christmasTree);

$balls = new ChristmasTreeBalls($decorator);
$balls->addBalls();

echo $decorator->getDescription();

echo '<br>';

$star = new ChristmasTreeStar($decorator);
$star->addStar();

echo $decorator->getDescription();

echo '<br>';

//Retour à la normale
$decorator->resetDescription();
echo $decorator->getDescription();
