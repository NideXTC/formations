<?php
/*
    echo '<pre>';
    var_dump($_POST);
    echo '</pre>';

    echo '<pre>';
    print_r ($_POST);
    echo '</pre>';
*/
if(isset($_POST['first_name']) && isset($_POST['name'])
    && !empty($_POST['password']) &&  !empty($_POST['email']) ) {

    echo 'Le prénom est : ' . $_POST['first_name'] . '<br>';
    echo 'Le nom est : ' . $_POST['name'] . '<br>';
    echo 'Le mot de passe est : ' . $_POST['password'] . '<br>';
    echo 'L\'email est : ' . $_POST['email'] . '<br>';

} else if (isset($_POST['password'])) {
    echo 'Champs vides';
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form action="" method="post">
    <input type="text" name="name" id="name" placeholder="name" required>
    <br>
    <input type="text" name="first_name" id="first_name"  placeholder="first_name" required>
    <br>
    <input  type="text" name="email" id="email"  placeholder="email" required>
    <br>
    <input type="text" name="password" id="password" placeholder="password" required>
    <br>
    <button type="submit"> Enregistrer </button>
</form>
</body>
</html>