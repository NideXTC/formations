<?php

require 'connect.php';

if (!empty($_POST)) {
    $req = $dbh->prepare('SELECT * FROM user 
                   WHERE email = :email 
                   AND password = :password');

    $req->execute([
        ':email' => $_POST['email'],
        ':password' => $_POST['password']
    ]);

    if(count($req->fetchAll()) > 0){
        echo 'Exists';
        $_SESSION['connected'] = true;
        header('Location:espace-admin.php');
    } else {
        echo 'Unknown';
    }
}

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
    <input type="text" name="email" id="email">
    <input type="text" name="password" id="password">
    <button type="submit">Valider</button>
</form>
</body>
</html>