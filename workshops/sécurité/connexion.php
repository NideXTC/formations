<?php
session_start();
require 'User.php';
if (!empty($_POST)) {
    $u = new User();
    if ($test = $u->findByCredentials($_POST['email'], $_POST['password'])) {
        var_dump($test);
        $_SESSION['user'] = $test;
        header('location:/index.php?p=compte.php');
    }
}
?>

<form role="form" method="post">
    <div class="form-group">
        <label for="email">Email address:</label>
        <input type="text" class="form-control" name="email" id="email" required>
    </div>
    <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control" id="pwd" name="password">
    </div>
    <button type="submit" class="btn btn-info">Submit</button>
</form>
