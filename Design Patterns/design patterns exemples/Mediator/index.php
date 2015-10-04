<?php

require 'Chatroom.php';
require 'User.php';

$chatroom = new Chatroom();

$jean = new User('Jean');
$martine = new User('Martine');

$jean->sendMessage('COUCOU');
$martine->sendMessage('POSAYYY');
