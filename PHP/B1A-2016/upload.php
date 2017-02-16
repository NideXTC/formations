<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);


echo '<pre>';
var_dump($_FILES);
echo '</pre>';


if (isset($_FILES['nomDuInput'])) {
    // echo $_FILES['nomDuInput']['name'] . '<br>'; // Nom du fichier

    $finfo = finfo_open(FILEINFO_MIME_TYPE); // Vérifie le type MIME du fichier
    $mime = finfo_file($finfo, $_FILES['nomDuInput']['tmp_name']); // Regarde dans ce fichier le type MIME
    finfo_close($finfo); // Fermeture de la lecture


    $filename = explode('.', $_FILES['nomDuInput']['name']); // Explosion du nom sur le point
    $extension =  $filename[count($filename) - 1]; // L'extension du fichier


    echo $extension . ' ' . $mime;
    if($extension == 'png' && $mime == 'image/png'){
        move_uploaded_file($_FILES['nomDuInput']['tmp_name'],
            'upload/' . $_FILES['nomDuInput']['name']);
        echo 'upload done';
    } else {
        echo 'format incorrect';
    }

}

?>

<form action="" method="POST" enctype="multipart/form-data">
    <input type="file" name="nomDuInput" id="file">
    <button type="submit">Envoyer</button>
</form>