<?php

session_start();

$_SESSION['b'] = 'b';
array_push($_SESSION['group'], 'b');
header('Location:c.php');