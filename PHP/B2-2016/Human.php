<?php

abstract class Human
{
    /**
     * Human constructor.
     */
    public function __construct()
    {
        echo 'toto';
    }

    abstract public function toto();

    public final function hello()
    {
        echo 'Hello from the other side !';
    }
}