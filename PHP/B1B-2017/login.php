<?php

require 'connect.php';

// Traiter le post‡
if(!empty($_POST)){
    $stmt = $dbh->prepare('SELECT * FROM users WHERE email = :email AND password = :password');
    $stmt->execute([
        ':email' => $_POST['email'],
        ':password' => $_POST['password']
    ]);
    $users = $stmt->fetchAll();
    var_dump($users);

    // Tester via count() le nombre d'éléments dans le tableau
    // Si l'utilisateur existe -> créer la variable $_SESSION['connected'] avec un bool
}

?>


<form action="" method="post">
    <input type="text" name="email" id="">
    <input type="password" name="password" id="">
    <button type="submit">Valider</button>
</form>