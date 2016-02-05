<?php
session_start();

if (!empty($_POST['login']) && !empty($_POST['password'])) {
    if ( $_POST['password'] === 'koala') {
        $_SESSION['login'] = $_POST['login'];
        header('Location:login/admin.php');
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
