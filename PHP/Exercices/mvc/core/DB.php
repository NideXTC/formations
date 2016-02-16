<?php

/**
 * Created by PhpStorm.
 * User: NideXTC
 * Date: 16/02/2016
 * Time: 12:27
 */
class DB
{

    private $_db;

    /**
     * DB constructor.
     */
    public function __construct()
    {
        try {
            $this->_db = new PDO('mysql:host=localhost;port=3306;dbname=test;charset=utf8', 'root', 'root');
            $this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->_db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
        } catch (PDOException $pe) {
            echo $pe->getMessage();
        }

    }

    function pdo_query($req, $data = [], $fetch = true)
    {
        $stmt = $this->_db->prepare($req);
        $stmt->execute($data);

        return ($fetch) ? $stmt->fetchAll() : true;
    }


    function pdo_exec($req, $data = [])
    {
        $stmt = $this->_db->prepare($req);
        $stmt->execute($data);
    }


}