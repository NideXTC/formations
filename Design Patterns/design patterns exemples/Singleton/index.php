<?php
/**
 * Created by PhpStorm.
 * User: nidextc
 * Date: 20/09/15
 * Time: 17:30
 */

require 'Singleton.php';

$obj = Singleton::getInstance();
var_dump($obj === Singleton::getInstance());
