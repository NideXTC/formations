<?php


class User extends Human implements UserInterface, TotoInterface
{

    public function getToto($var)
    {
        return 'toto';
    }

    public function getTata()
    {
        // TODO: Implement getTata() method.
    }
}