<?php

abstract class Human
{
    public abstract function getToto($var);

    public final function getCoucou()
    {
        echo 'coucou';
    }
}