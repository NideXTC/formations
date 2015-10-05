<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

require 'CookInterface.php';
require 'Potato.php';
require 'Steak.php';

$order = [new Potato(), new Steak()];

foreach ($order as $v)
{
    $v->cook();
}