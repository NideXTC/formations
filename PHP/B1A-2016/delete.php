<?php



require 'connect.php';

$req = $dbh->prepare('DELETE FROM user WHERE id = :id ');
$req->execute([
    ':id' => $_SESSION['id']
]);

header('Location:inscription.php');