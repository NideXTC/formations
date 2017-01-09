<?php

require 'connect.php';


var_dump($_SESSION);

if (!empty($_POST)) {
    $req = $dbh->prepare('SELECT * FROM user 
                   WHERE email = :email 
                   AND password = :password');

    $req->execute([
        ':email' => $_POST['email'],
        ':password' => $_POST['password']
    ]);

    $users = $req->fetchAll();

    echo '<pre>';
    var_dump($users);
    echo '</pre>';

    if(count($users) > 0){
        $_SESSION['connected'] = true;
        $_SESSION['id'] = $users[0]['id'];
        //header('Location:account.php');
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