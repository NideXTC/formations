<?php
require 'connect.php';

if (!empty($_POST['login']) && !empty($_POST['password'])) {
    pdo_exec($db, 'INSERT INTO users SET login = :login, password = :password', [
        ':login' => $_POST['login'],
        ':password' => $_POST['password']
    ]);
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<form action="" method="post">
    <input type="text" name="login" placeholder="login" id="" required>
    <input type="text" name="password" id="" placeholder="password" required>
    <button type="submit">Valider</button>
</form>
</body>
</html>