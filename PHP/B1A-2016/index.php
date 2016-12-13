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
    $size = strlen($text); // Toto -> 4
    for ($i = 0; $i < $size; $i++) {
        $ascii = ord($text[$i]);
        if($ascii > 96 && $code < 123){
            $text[$i] = chr($ascii - 32);
        }
    }

    echo $text;
}

maj('Coucou !');










