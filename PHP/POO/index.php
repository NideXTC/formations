<?php

require 'UserException.php';
require 'UserInterface.php';
require 'TotoInterface.php';
require 'Human.php';
require 'User.php';
require 'Validator.php';

class A
{

}

$a = new A();

$user = new User();

$user->getCoucou();

$v = new Validator();

try {
    $v->validate($user);
} catch (UserException $e) {
    echo $e->getMessage();
} catch (Exception $e) {
    echo 'Autre exception';
}
