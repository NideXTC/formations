<?php


class Student
{
    private $_name;
    private $_first_name;

    /**
     * Student constructor.
     * @param $_first_name
     * @param $_name
     */
    public function __construct($_first_name, $_name)
    {
        $this->_first_name = $_first_name;
        $this->_name = $_name;
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
     * @return $this
     */
    public function setName($name)
    {
        $this->_name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFirstName()
    {
        return $this->_first_name;
    }

    /**
     * @param mixed $first_name
     * @return $this
     */
    public function setFirstName($first_name)
    {
        $this->_first_name = $first_name;
        return $this;
    }
}