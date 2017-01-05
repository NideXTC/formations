<?php
require 'connect.php';

if (!$_SESSION['connected']) {
    // l'utilisateur n'est pas connecté
    header('Location:login.php');
}

if (!empty($_POST)) {
    $requete = $dbh->prepare('UPDATE user SET name = :name, email = :email, password = :password WHERE id = :id');
    $requete->execute([
        ':name' => $_POST['name'],
        ':email' => $_POST['email'],
        ':password' => $_POST['password'],
        ':id' => $_SESSION['id']
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
    <style>
    </style>
</head>
<body>


<?php
// L'utilisateur est connecté

echo 'L\'id utilisateur est ' . $_SESSION['id'];


$requete = $dbh->prepare('SELECT * FROM user WHERE id = :id');
$requete->execute([':id' => $_SESSION['id']]);
$result = $requete->fetchAll();
echo '<pre>';
echo print_r($result);
echo '</pre>'; ?>


<form action="" method="post">
    <label>
        nom : <input type="text" name="name" id="" placeholder="nom" value="<?= $result[0]['name'] ?>">
    </label>
    <br>

    <label>
        email :
        <input type="text" name="email" id="" placeholder="email" value="<?= $result[0]['email'] ?>">
    </label>
    <br>

    <label>
        mot de passe :
        <input type="text" name="password" id="" placeholder="password" value="<?= $result[0]['password'] ?>">
    </label>
    <br>

    <button type="submit">Enregister</button>
</form>


</body>
</html>












