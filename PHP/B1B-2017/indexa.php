<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);


// function [nom de la fonction] ([paramètres])
function show($text)
{
    echo $text;
}

show('Texte à afficher');


// Exercice 3


// 0123456..


echo 'Exercice 3 <br>';
for ($i = 0; $i < 10; $i++) {
    echo $i;
}

echo '<br>';
$j = 0;
while ($j < 10) {
    echo $j;
    $j++;
}

echo '<br>Exercice 4 <br>';
$array = ['a', 'b', 'c'];

$size = sizeof($array);
for ($i = 0; $i < $size; $i++) {
    echo $array[$i];
}

echo '<br>';
foreach ($array as $val) {
    echo $val;
}
echo '<br>';
foreach ($array as $index => $val) {
    echo $index . ' ' . $val;
}


// ET logique
if (true && true) {

}

// OU logic
if (true ||  true) {

}


echo '<br> EXERCICE 5 <br>';

$string = 'Coucou Test =)';
$size = strlen($string);

for ($i = 0; $i < $size; $i++) {
    $ascii = ord($string[$i]);

    if($ascii > 96 && $ascii < 122){
        // lettre en minuscule
       echo  chr($ascii - 32); // lettre en mascule
    } else {
        echo $string[$i]; // Les autres caractères
    }
}

echo '<br> EXERCICE 6 <br>';


function fibonacci($start, $next, $limit){
    echo $start . ' ';
    if($limit != 0) {
        fibonacci($next, $start + $next, --$limit);
    }
}

fibonacci(1, 1, 9);










