<?php


ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

$dsn = 'mysql:dbname=b1b_ingesup;host:127.0.0.1';
$user = 'root';
$password = 'root';

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (Exception $e) {
    echo $e->getMessage();
}

if (!empty($_POST)) {
    $stmt = $dbh->prepare('
                INSERT INTO users(name, email, password) 
                VALUES (:name, :email, :password);');
    $stmt->execute([
        ':name' => $_POST['name'],
        ':email' => $_POST['email'],
        ':password' => $_POST['password']
    ]);
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
    <input type="text" name="name" id="">
    <input type="text" name="email" id="">
    <input type="text" name="password" id="">
    <button type="submit">Enregistrer</button>
</form>
</body>
</html>