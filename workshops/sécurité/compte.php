<?php
session_start();
if (empty($_SESSION['user']->name)) header('location:/');

echo 'Bonjour : ' . $_SESSION['user']->name;