<?php
/*
echo '<pre>';
print_r($_POST);
echo '</pre>';
*/

// Si le post n'est pas vide
if (!empty($_POST)) {
    echo 'Le nom est : ' . $_POST['nom'] . '<br>';
    echo 'Le prénom est : ' . $_POST['prenom'] . '<br>';
    echo 'L\'email est : ' . $_POST['email'] . '<br>';
    echo 'Le password est : ' . $_POST['password'] . '<br>';
}
?>

<form action="" method="post">
    <input type="text" name="nom" placeholder="nom">
    <input type="text" name="prenom" placeholder="prénom">
    <input type="text" name="email" placeholder="email">
    <input type="text" name="password" placeholder="password">
    <button type="submit">Valider</button>
</form>