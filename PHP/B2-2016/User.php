<?php

class User extends Human implements GlobalInterface, UserInterface
{
    private $_id,
        $_pwd,
        $_name,
        $_gender,
        $_email;

    /**
     * User constructor.
     * @param $_id
     * @param $_pwd
     * @param $_name
     * @param $_gender
     * @param $_email
     */
    public function __construct($_id = null, $_pwd = null, $_name = null, $_gender = null, $_email = null)
    {
        $this->_id = $_id;
        $this->_pwd = $_pwd;
        $this->_name = $_name;
        $this->_gender = $_gender;
        $this->_email = $_email;
    }
    
    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->_id;
    }

    /**
     * @param mixed $id
     * @return mixed $this
     */
    public function setId($id)
    {
        $this->_id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPwd()
    {
        return $this->_pwd;
    }

    /**
     * @param mixed $pwd
     * @return mixed $this
     */
    public function setPwd($pwd)
    {
        $this->_pwd = $pwd;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->_name;
    }

    /**
     * @param mixed $name
     * @return mixed $this
     */
    public function setName($name)
    {
        $this->_name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getGender()
    {
        return $this->_gender;
    }

    /**
     * @param mixed $gender
     * @return mixed $this
     */
    public function setGender($gender)
    {
        $this->_gender = $gender;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->_email;
    }

    /**
     * @param mixed $email
     * @return mixed $this
     */
    public function setEmail($email)
    {
        $this->_email = $email;
        return $this;
    }

    public function toto()
    {
        // TODO: Implement toto() method.
    }

    public function coucou()
    {
        return 'hello user';
    }

    public function isValid()
    {
        // TODO: Implement isValid() method.
    }
}