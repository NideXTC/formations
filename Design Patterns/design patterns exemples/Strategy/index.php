<?php

require 'Client.php';

$client = new Client();
$array = ['GTA V','Fallout','FIFA'];

$client->setOutput(new ArrayOutput());
var_dump($client->loadOutput($array));

echo '<br>';

$client->setOutput(new JsonStringOutput());
var_dump($client->loadOutput($array));

echo '<br>';

$client->setOutput(new SerializedArrayOutput());
var_dump($client->loadOutput($array));