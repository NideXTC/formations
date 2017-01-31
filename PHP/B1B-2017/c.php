<?php

session_start();

$_SESSION['c'] = 'c';
array_push($_SESSION['group'], 'c');

echo '<pre>';
var_dump($_SESSION);
echo '</pre>';
