<?php
/***
 * EXERCICE 1
 ***/


// function
/*function show()
{
    return 'coucou' . PHP_EOL;
}

echo show();
*/

// procédure
/*
function show2()
{
    echo 'coucou2' . PHP_EOL;
}

show2();
$/
/***
 * EXERCICE 2
 ***/

/*
function show3($text)
{
    echo $text . '<br>'; // En web
    echo $text . PHP_EOL; // En terminal
}

show3("velo");
show3("voiture");
*/

/***
 * EXERCICE 3
 ***/

/*
for ($i = 0; $i < 10; $i++) {
    echo $i;
}

echo '<br>' . PHP_EOL;

$j = 0;
while ($j < 10) {
    echo $j;
    $j++;
}*/


/**
 * Exercice 4
 */


$ar = ['a', 'b', 'c'];
$size = sizeof($ar);

for ($i = 0; $i < $size; $i++) {
    echo $ar[$i];
}

echo PHP_EOL;

foreach ($ar as $key => $value) {
    echo $key . ' ' . $value;
}


/**
 * Exercice 5
 */


function maj($text)
{
    // Retourne la taille de la chaîne de caractères
    $size = strlen($text);

    // On boucle sur chaque caractère
    for ($i = 0; $i < $size; $i++) {

        // On récupère le code ASCII de chaque lettre
        $ascii = ord($text[$i]);

        // On vérifie que la lettre est bien en minuscule
        if($ascii > 96 && $ascii < 123){

            // On transforme le code ASCII en lettre
            $text[$i] = chr($ascii - 32);
        }
    }

    // On affiche le texte modifié 
    echo $text;
}

maj('Coucou !');










