<?php

require 'GlobalInterface.php';
require 'UserInterface.php';
require 'DB.php';
require 'Test.php';
require 'Human.php';
require 'User.php';


$db = DB::getInstance();
var_dump($db->getConnection());


$db = DB::getInstance();
var_dump($db->getConnection());
