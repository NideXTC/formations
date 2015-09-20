<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

require 'CookInterface.php';
require 'Potato.php';
require 'PotatoAdapter.php';
require 'Steak.php';

$order = [new PotatoAdapter(new Potato()), new Steak()];

foreach ($order as $v)
{
    $v->cook(); 
}