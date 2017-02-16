<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);


/* Connexion à une base ODBC avec l'invocation de pilote */
$dsn = 'mysql:dbname=b1a_ingesup;host=127.0.0.1';
$user = 'root';
$password = 'root';

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
}

// Préparer la requête et l'enregistrer pour le lancement
//$stmt = $dbh->prepare('SELECT name, email FROM user');
$stmt = $dbh->prepare('SELECT * FROM user WHERE name = \'Toto\' AND password = \'Titi\'; ');

// Executer la requête -> retourne un boolean
$stmt->execute();

echo '<pre>';
var_dump($stmt->fetchAll());
echo '</pre>';



/*
$stmt = $dbh->prepare('SELECT * FROM user');
$stmt->execute();
echo '<pre>';
var_dump($stmt->fetchAll());
echo '</pre>';
*/