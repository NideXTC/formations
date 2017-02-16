<?php


require 'connect.php';

$req = $dbh->prepare('SELECT * FROM products WHERE id = :id');

foreach ($_SESSION['panier'] as $item) {
    $req->execute([ ':id' => $item]);
    echo '<pre>';
    print_r($req->fetchAll());
    echo '</pre>';
}