<?php

require 'connect.php';

// Traiter le post
if (!empty($_POST)) {


    //$stmt = $dbh->prepare('SELECT COUNT(id) as count FROM users WHERE email = :email AND password = :password');
    $stmt = $dbh->prepare('SELECT * FROM users WHERE email = :email AND password = :password');
    $stmt->execute([
        ':email' => $_POST['email'],
        ':password' => $_POST['password']
    ]);
    $users = $stmt->fetchAll();
    var_dump($users);

    //$users[0]['count'];

    // Tester via count() le nombre d'éléments dans le tableau
    if (count($users) > 0) {
        // Si l'utilisateur existe -> créer la variable $_SESSION['connected'] avec un bool
        $_SESSION['connected'] = true;
        $_SESSION['id'] = $users[0]['id'];
        header('Location:admin.php');
    }
}

?>


<form action="" method="post">
    <input type="text" name="email" id="">
    <input type="password" name="password" id="">
    <button type="submit">Valider</button>
</form>