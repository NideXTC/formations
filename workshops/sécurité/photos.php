<?php
if (!empty($_FILES)) {
    if ($_FILES["pictures"]["error"] == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["pictures"]["tmp_name"];
        $name = $_FILES["pictures"]["name"];
        move_uploaded_file($tmp_name, "img/uploads/$name");

    }
}
?>

<h2>Envoyez-nous vos plus belles photos de fromage !</h2>
<br>
<br>
<form action="" method="post" enctype="multipart/form-data">
    <p>Images:
        <input type="file" name="pictures" class="form-control"/>
        <br>
        <input type="submit" value="Send" class="btn btn-info"/>
    </p>
</form>