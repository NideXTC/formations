<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);



if (!empty($_FILES)) {

    echo '<pre>';
    var_dump($_FILES);
    echo '</pre>';

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $_FILES['uploadDeFichier']['tmp_name']);

    // test le mime & l'extension avec pathinfo() -- On ne veut que des fichiers PNG

    move_uploaded_file($_FILES['uploadDeFichier']['tmp_name'], 'uploads/' . $_FILES['uploadDeFichier']['name']);

}
?>
<form action="" method="post" enctype="multipart/form-data">
    <input type="file" name="uploadDeFichier" id="">
    <button type="submit">
        Envoyer
    </button>
</form>