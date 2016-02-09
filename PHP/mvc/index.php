<?php

use App\Models\User ;

error_reporting(E_ALL);
ini_set("display_errors", 1);
require 'vendor/autoload.php';

$router = new AltoRouter();


$uri = explode( '/',str_replace('/CoursYNov/PHP/mvc/','',$_SERVER['REQUEST_URI']));

//var_dump($uri);

$controller = ucfirst($uri[0]);
$action = $uri[1];

array_splice($uri,0,2);

//var_dump($uri);


require 'models/User.php';
$user = new User('josay','rayban','josay.rayban@toto.com');
$user->findByName('Alexis');


if(file_exists('controllers/'.$controller.'.php')){
    require 'controllers/'.$controller.'.php';

    $c = new $controller();

    call_user_func_array([$c, $action],$uri);
} else {
    http_response_code(404);
}