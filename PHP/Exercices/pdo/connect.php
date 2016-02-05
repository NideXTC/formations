<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
/*
 * DOC : pdo.__construct()
 * Connexion à la BDD
 * Wrap try/catch
 * Jeter des exceptions
 */
try {
    $db = new PDO('mysql:host=localhost;port=3306;dbname=test;charset=utf8', 'root', 'root');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

} catch (PDOException $pe) {
    echo $pe->getMessage();
}

$sql = "SELECT * FROM users WHERE id = :id";
$stmt = $db->prepare($sql);
$stmt->execute([':id' => 1]);

var_dump($stmt->fetchAll());

/*
 * DOC : pdo.prepare() / pdo.execute()
 * Fonction qui prend comme param la requête SQL & les valeurs
 * query('select * from toto where id = ?', [1])
 */


