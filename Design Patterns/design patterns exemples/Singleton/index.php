<?php

require 'Singleton.php';
require 'SingletonChild.php';

$obj = Singleton::getInstance();
$child = SingletonChild::getInstance();


var_dump($obj === Singleton::getInstance());
var_dump($obj === SingletonChild::getInstance());
var_dump($child === SingletonChild::getInstance());

