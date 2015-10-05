<?php

require 'OutputInterface.php';
require 'FeeTwenty.php';
require 'Client.php';

$client = new Client();
$price= 5;

$client->setOutput(new FeeTwenty());
var_dump($client->loadOutput($price));
