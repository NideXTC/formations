<?php

namespace App\Models;
use App\Core\DB;

/**
 * Created by PhpStorm.
 * User: NideXTC
 * Date: 26/01/2016
 * Time: 15:59
 */
class User
{
    private $_id;
    private $_name;
    private $_first_name;
    private $_email;

    /**
     * User constructor.
     * @param string $_name
     * @param string $_first_name
     * @param string $_email
     */
    public function __construct($_name, $_first_name, $_email)
    {
        $this->_name = $_name;
        $this->_first_name = $_first_name;
        $this->_email = $_email;
    }

    public function __call($name, $arguments)
    {
        $preg = preg_match('/^findBy(.*)/i', $name, $matches);

        var_dump($preg);
        if ($preg === 1) {

            $this->findAll([strtolower($matches[1]),$arguments[0]]);
        }

    }


    public function findAll($params = null)
    {

        var_dump($params);
        if(!is_array($params)){
            return DB::getInstance()->query('SELECT * FROM users');
            echo 'SELECT * FROM users';
        } else {
            echo 'SELECT * FROM users WHERE '.$params[0].' = "'.$params[1].'"';
            //return DB::getInstance()->query('SELECT * FROM users WHERE '.$params[0].' = ?', [$params[1]]);
        }
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
     * @return string
     */
    public function getName()
    {
        return $this->_name;
    }

    /**
     * @param string $name
     * @return string $this
     */
    public function setName($name)
    {
        $this->_name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getFirstName()
    {
        return $this->_first_name;
    }

    /**
     * @param string $first_name
     * @return string $this
     */
    public function setFirstName($first_name)
    {
        $this->_first_name = $first_name;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->_email;
    }

    /**
     * @param string $email
     * @return string $this
     */
    public function setEmail($email)
    {
        $this->_email = $email;
        return $this;
    }


    public function getArticles()
    {

    }

}