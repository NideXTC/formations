<?php

/**
 * Created by PhpStorm.
 * User: NideXTC
 * Date: 31/03/2016
 * Time: 11:30
 */
class Validator
{
    public function validate(UserInterface $u)
    {
        throw new UserException('User Exception');
        echo $u->getToto('test');
    }
}