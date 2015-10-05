<?php

require 'MoviePrototype.php';
require 'ActionMoviePrototype.php';
require 'FantasyMoviePrototype.php';

$actionProto = new ActionMoviePrototype();
$fantasyProto = new FantasyMoviePrototype();

$impossibruuu = clone $actionProto;
$impossibruuu->setTitle('Mission impossible 5');

$prayTheV8 = clone $actionProto;
$prayTheV8->setTitle('Mad Max');

echo '<pre>';
var_dump($impossibruuu, $prayTheV8);
echo '</pre>';

$lightSaber = clone $fantasyProto;
$lightSaber->setTitle('Star Wars');

$bikeAndFire = clone $fantasyProto;
$bikeAndFire->setTitle('Ghost rider');

echo '<pre>';
var_dump($lightSaber, $bikeAndFire);
echo '</pre>';