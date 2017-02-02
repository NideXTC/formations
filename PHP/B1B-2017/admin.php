<?php


require 'connect.php';

echo $_SESSION['id']; // L'identifiant de l'utilisateur


// SELECT * FROM users WHERE id = :id -> $user


// <?=  -> <?php echo

?>


<form action="" method="post">
    <input type="text" name="name" value="<?= $user['name'] ?>">

    <button type="submit">Valider</button>
</form>










