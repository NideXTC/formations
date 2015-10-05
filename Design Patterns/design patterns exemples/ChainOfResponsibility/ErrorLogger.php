<?php

class ErrorLogger extends Logger
{

    protected function _log($message)
    {
        echo '<br> On écrit dans un fichier l\'erreur : ' . $message;
    }
}