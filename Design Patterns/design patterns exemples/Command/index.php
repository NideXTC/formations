<?php
header('Content-Type: text/html; charset=utf-8');
require 'TVControl.php';
require 'TVInterface.php';
require 'TurnOffTV.php';
require 'TurnOnTV.php';

$informations = ['TurnOffTV', 'TurnOnTV'];
$commands = [];

foreach ($informations as $v) {
    if (class_exists($v)) {
        $commands[] = new $v (new TVControl());
    } else {
        throw new Exception ('..Command Not Found..');
    }
}

echo 'Je n\'ai toujours pas executé les fonctions <br>';

array_walk($commands, function($a){
    $a->execute();
});
