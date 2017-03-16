<?php 
header('Content-Type:  application/json; charset=utf-8');

if(file_exists('token')){
	$token = file_get_contents('token'); 
	if(!empty($_REQUEST['token'])){
		if($_REQUEST['token'] != $token){
			die(json_encode([
				'success' => false, 
				'error' => 'Problème de token'
				]));
		}
	} else {
		die(json_encode([
				'success' => false, 
				'error' => 'Token vide'
				]));
	}
	
}
else {
	die(json_encode([
		'success' => false, 
		'error' => 'Non connecté'
		]));
}

if($_SERVER['REQUEST_METHOD'] == 'GET'){
	if(file_exists('messages')){
		echo file_get_contents('messages');	
	} else {
		echo json_encode([]);
	} 
} else if($_SERVER['REQUEST_METHOD'] == 'POST' ){
	if(!empty($_POST['message'])){
		if(file_exists('messages')){
			$messages = json_decode(file_get_contents('messages'), true);		
		} else {
			$messages = [];
		}
		array_push($messages, ['author' => base64_decode($token), 'message' => $_POST['message']]); 
		file_put_contents('messages', json_encode($messages));	
		echo json_encode(['success' => true]);
	} else {
		echo json_encode(['success' => false, 'error' => 'Message vide']);
	}
}