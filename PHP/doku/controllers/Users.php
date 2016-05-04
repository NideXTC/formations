<?php

require 'models/User.php';

class Users
{
    public function view($id)
    {
        $user = User::findById($id);
        require 'views/users/view.php';
    }
}