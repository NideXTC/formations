<?php

require 'connect.php';


if (empty($_SESSION['connected'])) {
    header('Location:login.php');
}

if(!empty($_GET['action']) && $_GET['action'] == 'del'
    && !empty($_GET['id'])){
    // SUPPRESSION DE L'UTILISATEUR
    $delStmt = $dbh->prepare('DELETE FROM users WHERE id = :id');
    $delStmt->execute([':id' => $_GET['id']]);
}



$stmt = $dbh->prepare('SELECT * FROM users;');
$stmt->execute();
$users = $stmt->fetchAll();
?>
<table border="1">
    <tr>
        <th>#</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Action</th>
    </tr>

    <?php
    foreach ($users as $user){
        echo '
        <tr>
            <td>'.$user['id'].'</td>
            <td>'.$user['name'].'</td>
            <td>'.$user['email'].'</td>
            <td><a href="delete.php?action=del&id='.$user['id'].'">Supprimer</a></td>
        </tr>';
    }
    ?>

</table>
