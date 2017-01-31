<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);


// L'utilisateur a envoyé l'image
if (!empty($_FILES)) {

    $mime_valid = ['image/png', 'image/jpeg','image/gif'];
    $extension_valid = ['png', 'jpeg','jpg','gif'];

    $extension = pathinfo($_FILES['uploadDeFichier']['name'])['extension'];

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $_FILES['uploadDeFichier']['tmp_name']);

    // test le mime & l'extension avec pathinfo() -- On ne veut que des fichiers PNG
    if(in_array($extension, $extension_valid) && in_array($mime, $mime_valid)){
        move_uploaded_file($_FILES['uploadDeFichier']['tmp_name'], 'uploads/' . $_FILES['uploadDeFichier']['name']);
        echo 'Done';
    } else {
        echo 'Erreur de format';
    }

}
?>
<form action="" method="post" enctype="multipart/form-data">
    <input type="file" name="uploadDeFichier" accept="image/*">
    <button type="submit">
        Envoyer
    </button>
</form>