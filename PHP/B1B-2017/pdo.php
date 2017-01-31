<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

$dsn = 'mysql:dbname=b1b_ingesup;host:127.0.0.1';
$user = 'root';
$password = 'root';

try {
     $dbh = new PDO($dsn, $user, $password);
} catch (Exception $e){
    echo $e->getMessage();
}

$stmt = $dbh->prepare('SELECT * FROM users WHERE id = ?;');
$stmt->execute([1]);
$users = $stmt->fetchAll();
?>
<table border="1">
    <tr>
        <th>#</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Mot de passe</th>
    </tr>

    <?php
    foreach ($users as $user){
        echo '
        <tr>
            <td>'.$user['id'].'</td>
            <td>'.$user['name'].'</td>
            <td>'.$user['email'].'</td>
            <td>'.$user['password'].'</td>
        </tr>';
    }
?>

</table>










