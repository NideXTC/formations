<?php

// Forcer l'affichage des messages d'erreurs
ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

session_start();


echo $_SESSION['a'] . $_SESSION['b'];

// Déconnexion
session_destroy();