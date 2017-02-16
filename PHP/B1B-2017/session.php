<?php
session_start();



echo '<pre>';
var_dump($_SESSION);
echo '</pre>';


echo '<pre>';
var_dump($_POST);
echo '</pre>';

file_put_contents('test.txt', print_r($_SESSION, true), FILE_APPEND);