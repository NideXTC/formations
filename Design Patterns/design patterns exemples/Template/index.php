<?php

require 'TVTemplate.php';
require 'BedroomTV.php';
require 'KitchenTV.php';

$bedroom = new BedroomTV();
$bedroom->watch();

echo '<br>';

$kitchen = new KitchenTV();
$kitchen->watch();