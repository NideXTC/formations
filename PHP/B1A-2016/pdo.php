<?php
/* Connexion à une base ODBC avec l'invocation de pilote */
$dsn = 'mysql:dbname=b1a_ingesup;host=localhost';
$user = 'root';
$password = 'root';

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
}