<?php

// Connexion à la BDD
require 'connect.php';

// Bloque l'accès si la personne n'est pas connectée
if (empty($_SESSION['connected'])) {
    header('Location:login.php');
}

// à l'envoie du formulaire
if (!empty($_POST)) {

    // initialisation du nom de la photo
    $pixName = '';

    // Upload de photo
    if (!empty($_FILES)) {

        $mime_valid = ['image/png', 'image/jpeg','image/gif'];
        $extension_valid = ['png', 'jpeg','jpg','gif'];

        $extension = pathinfo($_FILES['picture']['name'])['extension'];

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $_FILES['picture']['tmp_name']);

        // test le mime & l'extension avec pathinfo() -- On ne veut que des fichiers PNG
        if(in_array($extension, $extension_valid) && in_array($mime, $mime_valid)){
            move_uploaded_file($_FILES['picture']['tmp_name'], 'uploads/' . $_FILES['picture']['name']);

            // L'enregistrement du nom de la photo suite à l'upload
            $pixName = $_FILES['picture']['name'];
        } else {
            echo 'Erreur de format';
        }
    }

    // Enregistrement du produit avec le nom de la photo si il y a eu un upload 
    $stmt = $dbh->prepare('INSERT INTO products VALUES(NULL, :name, :price, :picture)');
    $stmt->execute([
        ':name' => $_POST['name'],
        ':price' => $_POST['price'],
        ':picture' => $pixName
    ]);
}

?>
<form action="" method="post" enctype="multipart/form-data">
    <label>
        Nom :
        <input type="text" name="name">
    </label>
    <br>
    <label>
        Prix :
        <input type="number" name="price">
    </label>
    <br>
    <label>
        Photo :
        <input type="file" name="picture">
    </label>
    <br>
    <button type="submit">Enregistrer</button>
</form>