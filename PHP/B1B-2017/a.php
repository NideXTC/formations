<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

session_start();

$_SESSION['group'] = [];


$_SESSION['a'] = 'a';

array_push($_SESSION['group'], 'a');



header('Location:b.php');