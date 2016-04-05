<?php ini_set('display_errors', 1); error_reporting(E_ALL); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gruyère.com</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link href="css/app.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>

<nav class="navbar navbar-default navbar-inverse">
    <div class="container-fluid">
        <ul class="nav navbar-nav">
            <li><a href="index.php?p=accueil.php">Accueil</a></li>
            <li><a href="index.php?p=inscription.php">Inscription</a></li>
            <li><a href="index.php?p=connexion.php">Mon compte</a></li>
            <li><a href="index.php?p=photos.php">Vos photos</a></li>
        </ul>
    </div>
</nav>

<header>
    <br>
    Gruyère.com : un site avec des vrais trous dedans !
</header>
<br>
<div class="container">
    <div class="jumbotron">
        <?php include (empty($_GET['p'])) ? 'accueil.php' : $_GET['p']; ?>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
        integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
        crossorigin="anonymous"></script>
</body>
</html>