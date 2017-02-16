<?php
session_start();

ini_set('display_errors',1);
ini_set('error_reporting',E_ALL);

/* Connexion à une base ODBC avec l'invocation de pilote */
$dsn = 'mysql:dbname=b1a_ingesup;host=127.0.0.1';
$user = 'root';
$password = 'root';

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
}

$req = $dbh->prepare('SELECT * FROM user');
$req->execute();
$result = $req->fetchAll();



echo $result[0]['id'] . ' ($result[0][\'id\'])';
echo '<br>';
echo $result[0][0] . ' ($result[0][0])';

// garder en mémoire l'identifiant utilisateur sur toutes les pages
$_SESSION['id'] = $result[0]['id'];

echo '<pre>';
print_r($result);
echo '</pre>';












