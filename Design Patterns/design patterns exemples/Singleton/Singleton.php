<?php

/**
 * Created by PhpStorm.
 * User: nidextc
 * Date: 20/09/15
 * Time: 17:28
 */
class Singleton
{
    public static function getInstance()
    {
        static $instance = null;
        if (null === $instance) {
            $instance = new static();
        }

        return $instance;
    }

    /**
     * Constructeur non publique afin d'éviter la création d'une nouvelle instance du *Singleton* via l'opérateur `new`
     */
    protected function __construct()
    {
    }

    /**
     * La méthode clone est privée afin d'empêcher le clonage de l'instance *Singleton*.
     *
     * @return void
     */
    private function __clone()
    {
    }

    /**
     * La méthode de désérialisation est privée afin d'empêcher le clonage de l'instance *Singleton*.
     *
     * @return void
     */
    private function __wakeup()
    {
    }
}