<?php
session_start();

require 'connect.php';

if (!empty($_POST['login']) && !empty($_POST['password'])) {
    $result = pdo_query($db, 'SELECT COUNT(id) count FROM users WHERE login = :login AND password = :password', [
        ':login' => $_POST['login'],
        ':password' => $_POST['password']
    ]);

    if ($result[0]->count > 0) {
        $_SESSION['login'] = $_POST['login'];
        header('Location:admin.php');
    } else {
        echo 'NOT CONNECTED';
    }
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<form action="#" method="post">
    <input type="text" name="login" placeholder="login" value="<?= (!empty($_POST['login']))?$_POST['login']:'' ?>" required>
    <input type="text" name="password" placeholder="password" required>
    <button type="submit">Valider</button>
</form>
</body>
</html>
