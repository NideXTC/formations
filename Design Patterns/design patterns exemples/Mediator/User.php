<?php

class User
{
    private $_name;

    /**
     * User constructor.
     * @param $_name
     */
    public function __construct($_name)
    {
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
     */
    public function setName($name)
    {
        $this->_name = $name;
    }

    public function sendMessage($message)
    {
        Chatroom::showMessage($this, $message);
    }
}