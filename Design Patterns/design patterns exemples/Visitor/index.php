<?php

require 'ThingInterface.php';
require 'VisitorInterface.php';
require 'TV.php';
require 'Keyboard.php';

$tv = new TV();
$tv->accept(new Keyboard());