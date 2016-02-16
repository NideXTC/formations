<?php

require 'core/DB.php';

class User
{
    private $_id,
        $_name,
        $_password,
        $_db;

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
        $this->_db = new DB();
    }

    public function getAccess()
    {
        return 'admin';
    }

    public function toto(User $u)
    {

    }


    public static function findById($id)
    {
        $db = new DB();
        $data = $db->pdo_query('SELECT * FROM users WHERE id = ?;', [$id]);
        $u = new User($data[0]->login, $data[0]->password, $data[0]->id);
        return $u;
    }

    public function delete()
    {
        $this->_db->pdo_exec('DELETE FROM users WHERE id = ?', [$this->_id]);
    }

    public function save()
    {
        if ($this->_id) {
            $this->_db->pdo_exec('UPDATE users SET login = :login, password = :password WHERE id = :id', [
                ':login' => $this->_name,
                ':password' => $this->_password,
                ':id' => $this->_id
            ]);
        } else {
            $this->_db->pdo_exec('INSERT INTO users SET login = :login, password = :password', [
                ':login' => $this->_name,
                ':password' => $this->_password
            ]);
        }
    }

    public static function findAll()
    {
        $array = [];

        $db = new DB();

        $data = $db->pdo_query('SELECT * FROM users;');

        foreach ($data as $k => $v) {
            $u = new User($v->login, $v->password, $v->id);

            array_push($array, $u);
        }

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

    public function __toString()
    {
        return $this->_id . ' - ' . $this->_name;
    }
}

















