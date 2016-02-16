<?php

class User
{
    private $_id,
        $_name,
        $_password;

    /**
     * User constructor.
     * @param $_id
     * @param $_name
     * @param $_password
     */
    public function __construct($_name = null, $_password = null, $_id = null)
    {
        $this->_id = $_id;
        $this->_name = $_name;
        $this->_password = $_password;
    }

    public function getAccess()
    {
        return 'admin';
    }


    public static function findAll()
    {
        $array = [];

        // recupération des utilisateurs en BDD
        //
        // boucle / ajouter dans le tableau une nouvelle instance de user
        //
        // renvoyer le tableau
        return $array;
    }

    /**
     * @return null
     */
    public function getId()
    {
        return $this->_id;
    }

    /**
     * @param null $id
     * @return null $this
     */
    public function setId($id)
    {
        $this->_id = $id;
        return $this;
    }

    /**
     * @return null
     */
    public function getName()
    {
        return $this->_name;
    }

    /**
     * @param null $name
     * @return null $this
     */
    public function setName($name)
    {
        $this->_name = $name;
        return $this;
    }

    /**
     * @return null
     */
    public function getPassword()
    {
        return $this->_password;
    }

    /**
     * @param null $password
     * @return null $this
     */
    public function setPassword($password)
    {
        $this->_password = $password;
        return $this;
    }
}

















