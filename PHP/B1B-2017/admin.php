<?php

require 'connect.php';


if (empty($_SESSION['connected'])) {
    header('Location:login.php');
}




if(!empty($_POST)){
    echo 'UPDATE users SET name = "'.$_POST['name'].'", email = "'.$_POST['email'].'" WHERE id = "'.$_SESSION['id'].'"';
    $stmt = $dbh->prepare('UPDATE users SET name = :name, email = :email WHERE id = :id');
    $stmt->execute([
        ':name' => $_POST['name'],
        ':email' => $_POST['email'],
        ':id' => $_SESSION['id']
    ]);
}


$stmt = $dbh->prepare('SELECT * FROM users WHERE id = :id');
$stmt->execute([
    ':id' => $_SESSION['id']
]);
$user = $stmt->fetch();

// <?=  -> <?php echo
?>


<form action="" method="post">
    <label>
        Nom :
        <input type="text" name="name" value="<?= $user['name'] ?>">
    </label>
    <br>
    <label>
        Email :
        <input type="text" name="email" value="<?= $user['email'] ?>">
    </label>


    <button type="submit">Valider</button>
</form>










