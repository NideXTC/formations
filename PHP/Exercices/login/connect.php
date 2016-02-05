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

function pdo_query($db, $req, $data = [], $fetch = true)
{
    $stmt = $db->prepare($req);
    $stmt->execute($data);

    return ($fetch) ? $stmt->fetchAll() : true;
}


function pdo_exec($db, $req, $data = [])
{
    $stmt = $db->prepare($req);
    $stmt->execute($data);
}




