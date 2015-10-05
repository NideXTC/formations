<?php

require 'TV.php';
require 'Watcher.php';

$tv = new TV('TF1');

$tim = new Watcher('Tim');
$berners = new Watcher('Berners');
$lee = new Watcher('Lee');

$tv->attach($tim);
$tv->attach($berners);
$tv->attach($lee);

$tv->detach($tim);

$tv->movie('Match France-Italie');