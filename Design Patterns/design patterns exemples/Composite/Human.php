<?php


abstract class Human
{
    private $_name;
    private $_gender;
    private $_age;


    /**
     * @param $_name
     * @param $_gender
     * @param $_age
     */
    public function __construct($_name, $_gender, $_age)
    {
        $this->_name = $_name;
        $this->_gender = $_gender;
        $this->_age = $_age;
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
     */
    public function setName($name)
    {
        $this->_name = $name;
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
     */
    public function setGender($gender)
    {
        $this->_gender = $gender;
    }

    /**
     * @return mixed
     */
    public function getAge()
    {
        return $this->_age;
    }

    /**
     * @param mixed $age
     */
    public function setAge($age)
    {
        $this->_age = $age;
    }
}