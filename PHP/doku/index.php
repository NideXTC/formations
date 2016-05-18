<?php


// On récupère le controller et l'action 
if(!empty($_GET['c']) && !empty($_GET['a'])){
	// On met une cap au controller
	$controller = ucfirst($_GET['c']); 
	// l'action 
	$action = $_GET['a'];

	// le lien vers le controller
	$file = 'controllers/' . $controller . '.php';

	// On vérifie que le fichier existe 
	if(file_exists($file)){
		// On appelle le fichier
		require $file; 
		// On instancie une classe
		$class = new $controller;

		// On appelle l'action dans le controller 
		call_user_func([$class, $action]);
	} 
}


/*
require 'models/User.php';

$user = new User();
$user->setName('Ducerf')
    ->setFirstName('Alexis')
    ->setPassword('toto')
    ->setEmail('alexis.ducerf@deercoders.com');
echo '<pre>';
var_dump($user);
echo '</pre>';

$user2 = new User(null, 'Ducerf', 'Alexis', 'toto','alexis.ducerf@deercoders.com');
echo '<pre>';
var_dump($user2);
echo '</pre>';
*/

$u = new Users();
$u->view(2);
