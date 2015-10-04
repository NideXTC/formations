<?php

class Chatroom
{
    public static function showMessage(User $user, $message)
    {
        echo $user->getName() . '(' . date('d-m-Y') . ') : ' . $message . '<br>';
    }
}