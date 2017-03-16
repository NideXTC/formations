<?php 
header('Content-Type:  application/json; charset=utf-8');

if(!empty($_POST['login'])){
	file_put_contents('token', base64_encode($_POST['login']));
	echo json_encode([
		'token' => 	base64_encode($_POST['login']),
		'success' => true
	]);
} else {
	echo json_encode([
		'success' => false
	]);
}