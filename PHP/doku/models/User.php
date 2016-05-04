<?php

require 'core/Database.php';

class User
{
    private $_id,
            $_name,
            $_first_name,
            $_password,
            $_email;

    /**
     * User constructor.
     * @param $_id
     * @param $_name
     * @param $_first_name
     * @param $_password
     * @param $_email
     */
    public function __construct($_id = null, $_name = null, $_first_name = null, $_password = null, $_email = null)
    {
        $this->_id = $_id;
        $this->_name = $_name;
        $this->_first_name = $_first_name;
        $this->_password = $_password;
        $this->_email = $_email;
    }


    public function create(){
        $sql = "INSERT INTO users
                SET name = :name,
                first_name = :first_name,
                password = :password,
                email = :email";

        Database::exec($sql, [
            ':name' => $this->_name,
            ':first_name' => $this->_first_name,
            ':password' => $this->_password,
            ':email' => $this->_email
        ]);
    }


    public function update(){
        // Update
    }

    public function delete(){
        // delete
    }


    public static function findById($id){

        $sql = "SELECT * FROM users WHERE id = ?";

        $user = Database::fetch($sql, [$id]);

        return new User($user->id, $user->name,
            $user->first_name, $user->password, $user->email);
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
    public function getFirstName()
    {
        return $this->_first_name;
    }

    /**
     * @param mixed $first_name
     * @return mixed $this
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
     * @param mixed $password
     * @return mixed $this
     */
    public function setPassword($password)
    {
        $this->_password = $password;
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


}