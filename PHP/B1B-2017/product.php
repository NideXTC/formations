<?php

require 'connect.php';

if (!empty($_GET['id'])) {
    $stmt = $dbh->prepare('SELECT * FROM products WHERE id = :id');
    $stmt->execute([
        ':id' => $_GET['id']
    ]);
    $product = $stmt->fetch();


    echo $product['name'] . '<br>';
    echo $product['price'] . '€<br>';
    if(!empty($product['picture'])){
        echo '<img src="uploads/' . $product['picture'] .'">';
    }
}

