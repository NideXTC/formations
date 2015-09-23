<?php

header('Content-Type: text/html; charset=utf-8');
require 'Logger.php';
require 'EmailLogger.php';
require 'ErrorLogger.php';
require 'StdoutLogger.php';

$logger = new StdoutLogger();
$logger->setNext(new ErrorLogger())->setNext(new EmailLogger());
$logger->log('Quelque chose se passe !');