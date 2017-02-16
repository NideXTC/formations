<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

// Initialiser la session
session_start();


// Si le post n'est pas vide
if (!empty($_POST['nom']) && !empty($_POST['email'])) {

    // On enregistre le post dans la session

    //$_SESSION = $_POST;

    $_SESSION['nom'] = $_POST['nom'];
    $_SESSION['prenom'] = $_POST['prenom'];
    $_SESSION['email'] = $_POST['email'];
    $_SESSION['password'] = $_POST['password'];

    header('Location:session.php');

    echo 'Le nom est : ' . htmlentities($_POST['nom']) . '<br>';
    echo 'Le prénom est : ' . htmlentities($_POST['prenom']) . '<br>';
    echo 'L\'email est : ' . htmlentities($_POST['email']) . '<br>';
    echo 'Le password est : ' . htmlentities($_POST['password']) . '<br>';
} elseif (!empty($_POST)) {
    echo 'erreur';
}
?>

<form action="" method="post">
    <input type="text" name="nom" placeholder="nom">
    <input type="text" name="prenom" placeholder="prénom">
    <input type="text" name="email" placeholder="email">
    <input type="text" name="password" placeholder="password">
    <button type="submit">Valider</button>
</form>