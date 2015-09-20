<?php

/**
 * Created by PhpStorm.
 * User: nidextc
 * Date: 20/09/15
 * Time: 17:24
 */
class AutomobileFactory
{
    public static function create($make, $model)
    {
        return new Automobile($make, $model);
    }
}