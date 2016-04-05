<?php

class User
{
    private $_db;
    private $_id;
    private $_name;
    private $_email;
    private $_first_name;
    private $_password;

    /**
     * User constructor.
     * @param $_name
     * @param $_email
     * @param $_first_name
     * @param $_password
     */
    public function __construct($_name = null, $_first_name = null, $_email = null, $_password = null, $_id = null)
    {
        $this->_name = $_name;
        $this->_email = $_email;
        $this->_first_name = $_first_name;
        $this->_password = $_password;
        $this->_id = $_id;

        try {
            $this->_db = new PDO('sqlite:' . dirname(__FILE__) . '/db/cheese.db');
            $this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->_db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
        } catch (PDOException $pe) {
            echo $pe->getMessage();
        }
    }


    public function findAll()
    {
        $array = [];
        $data = $this->_db->query('SELECT * FROM users;');
        foreach ($data as $k => $v) {
            $u = new User($v->name, $v->first_name, $v->email, $v->password, $v->id);
            array_push($array, $u);
        }
        return $array;
    }

    public function findByCredentials($email, $password)
    {
        $sql = 'SELECT * FROM users WHERE email = "' . $email . '" AND password = "' . $password . '";';
        $data = $this->_db->query($sql);
        return ($data->fetch());
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
     * @return $this
     */
    public function setId($id)
    {
        $this->_id = $id;
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

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->_password;
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
     * @return $this
     */
    public function setEmail($email)
    {
        $this->_email = $email;
        return $this;
    }

    /**
     * @param mixed $password
     * @return $this
     */
    public function setPassword($password)
    {
        $this->_password = $password;
        return $this;
    }

    public function save()
    {
        if ($this->_id) {
            $this->_db->query('UPDATE users SET name = ' . $this->_name . ', first_name = ' . $this->_first_name . '  email = ' . $this->_email . '  password = ' . $this->_password . '  WHERE id = ' . $this->_id);
        } else {
            $this->_db->query('INSERT INTO users VALUES (NULL, "' . $this->_name . '","' . $this->_first_name . '","' . $this->_email . '","' . $this->_password . '")');
        }
    }

}