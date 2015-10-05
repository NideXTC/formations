<?php

class EmailLogger extends Logger
{

    protected function _log($message)
    {
        echo '<br> On envoie par mail le message : ' . $message;
    }
}