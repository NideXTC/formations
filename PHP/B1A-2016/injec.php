<?php
ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

require 'connect.php';



foreach ($dbh->query('Select * from user where id=' . $_GET['id']) as $v) {
    echo '<pre>';
    var_dump($v);
    echo '</pre>';
}