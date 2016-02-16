<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
/*
 * DOC : pdo.__construct()
 * Connexion à la BDD
 * Wrap try/catch
 * Jeter des exceptions
 */

function pdo_query($req, $data = [], $fetch = true)
{
    global $db;
    $stmt = $db->prepare($req);
    $stmt->execute($data);

    return ($fetch) ? $stmt->fetchAll() : true;
}


function pdo_exec( $req, $data = [])
{
    global $db;
    $stmt = $db->prepare($req);
    $stmt->execute($data);
}


























