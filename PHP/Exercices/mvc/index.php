<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$uri = str_replace('/CoursYNov/PHP/Exercices/mvc/', '', $_SERVER['REQUEST_URI']);

$explode = explode('/', $uri);

$params = $explode;
array_splice($params, 0, 2);

require 'models/User.php';

$u  = User::findById(2);

echo $u;

$u->setName('Django')->save();

$u2 = new User('Alexis','superpassword');
$u2->save();







/*
if (file_exists('controllers/' . $explode[0] . '.php')) {
    require 'controllers/' . $explode[0] . '.php';
    $explode[1]($params);
    require 'views/' . strtolower($explode[0]) . '/' . $explode[1] . '.php';
} else {
    http_response_code(404);
}
*/







