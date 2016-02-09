<?php

namespace App\Core;

class DB
{
    private $_connection;
    private static $_instance; //The single instance
    private $_host = "HOSTt";
    private $_username = "USERNAME";
    private $_password = "PASSWORd";
    private $_database = "DATABASE";

    /*
    Get an instance of the Database
    @return Instance
    */
    public static function getInstance()
    {
        if (!self::$_instance) { // If no instance then make one
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    // Constructor
    private function __construct()
    {
        try {
            $this->_connection = new PDO('mysql:dbname=' . $this->_database . ';host=' . $this->_host, $this->_username,
                $this->_password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                ]);

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    // Magic method clone is empty to prevent duplication of connection
    private function __clone()
    {
    }

    // Get mysqli connection
    public function getConnection()
    {
        return $this->_connection;
    }


    function query($req, $data = [])
    {
        $stmt = $this->_connection->prepare($req);
        $stmt->execute($data);

        return $stmt->fetchAll();
    }


    function exec($req, $data = [])
    {
        $stmt = $this->_connection->prepare($req);
        $stmt->execute($data);
    }

}
