<?php

require 'Automobile.php';
require 'AutomobileFactory.php';

$citroen = AutomobileFactory::create('Citroen', 'C5');

print_r($citroen->get_make_and_model());