<?php

session_start();
header('Content-Type: application/json');
if (!empty($_POST['login']) && $_POST['login'] == 'root@toor.us' && !empty($_POST['password']) && $_POST['password'] == 'toor') {
    $_SESSION['connected'] = true;
    echo json_encode(['connected' => 'true']);
} else {
    echo json_encode(['connected' => 'false']);
}