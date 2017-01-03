<?php

//include 'connect.php';

//include_once 'connect.php';

require 'connect.php';

//require_once 'connect.php';

if (!empty($_POST)){
    $requete = $dbh->prepare('INSERT INTO user VALUES(NULL,
      :name, :password, :email
    )');

    $requete->execute([
        ':name' => $_POST['name'],
        ':password' => $_POST['password'],
        ':email' => $_POST['email']
    ]);
}


// Si le résultat de la bdd n'est pas vide -> connecte (création de session)

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form action="" method="post">
    <input type="text" name="name" id="name" placeholder="name">
    <input type="text" name="password" id="password" placeholder="password">
    <input type="text" name="email" id="email" placeholder="email">
    <input type="submit" value="Envoyer">
</form>
</body>
</html>