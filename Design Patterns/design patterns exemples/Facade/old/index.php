<?php

require 'Wheel.php';
require 'Engine.php';

$wheel = new Wheel();
$engine = new Engine();

$engine->start();
$wheel->roll();
