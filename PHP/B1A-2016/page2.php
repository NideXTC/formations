<?php
session_start();

if(isset($_GET['d'])){
    session_destroy();
}

echo '<pre>';
var_dump($_SESSION);
echo '</pre>';

// test l'existance de la variable 'd' en GET
// Ssi elle existe -> Deconnexion ( session_destroy() )

echo '<pre>';
var_dump($_GET);
echo '</pre>';

?>

<a href="page2.php?d=1">Déconnexion</a>