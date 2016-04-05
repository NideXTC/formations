<?php
session_start();
if (!empty($_POST)) {
    require 'User.php';
    $user = new User($_POST['name'],$_POST['first_name'],$_POST['email'],$_POST['password']);
    $user->save();
}

?>

<form role="form" method="post">
    <div class="form-group">
        <label for="name">Nom:</label>
        <input type="text" class="form-control" name="name" id="name" required>
    </div>
    <div class="form-group">
        <label for="first_name">Prénom:</label>
        <input type="text" class="form-control" name="first_name" id="first_name" required>
    </div>
    <div class="form-group">
        <label for="email">Email address:</label>
        <input type="text" class="form-control" name="email"  id="email" required>
    </div>
    <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control" id="pwd" name="password" >
    </div>
    <button type="submit" class="btn btn-info">Submit</button>
</form>