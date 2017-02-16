<?php
// Forcer l'affichage des messages d'erreurs
ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

// Initialisation de la session
session_start();

// Valorisation de la variable
$a = 1;

// Mise en session de la variable $a
$_SESSION['a'] = $a;

// Redirection vers b.php
header('Location:b.php');

