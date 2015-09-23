<?php


class StdoutLogger extends Logger
{

    protected function _log($message)
    {
        echo '<br> On affiche le message : ' . $message;
    }
}