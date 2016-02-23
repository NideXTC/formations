<?php

require 'vendor/autoload.php';


$router = new AltoRouter();
$router->setBasePath('/alto-app/');

$router->map( 'GET', '/users/[i:id]/', 'UserController#showDetails' );




$match = $router->match();



use App\Auth\User;
use App\Orders\User as UserOrder;

$u = new User();

$u = new UserOrder();




new App\A\Test();
new App\B\Test();




