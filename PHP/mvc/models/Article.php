<?php

namespace App\Models;

/**
 * Created by PhpStorm.
 * User: NideXTC
 * Date: 09/02/2016
 * Time: 10:03
 */
class Article
{

    private $_id;
    private $_title;
    private $_text;
    private $_date;

    /**
     * Article constructor.
     * @param $_title
     * @param $_text
     * @param $_date
     */
    public function __construct($_title, $_text, $_date)
    {
        $this->_title = $_title;
        $this->_text = $_text;
        $this->_date = $_date;
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
    public function getTitle()
    {
        return $this->_title;
    }

    /**
     * @param mixed $title
     * @return mixed $this
     */
    public function setTitle($title)
    {
        $this->_title = $title;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getText()
    {
        return $this->_text;
    }

    /**
     * @param mixed $text
     * @return mixed $this
     */
    public function setText($text)
    {
        $this->_text = $text;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->_date;
    }

    /**
     * @param mixed $date
     * @return mixed $this
     */
    public function setDate($date)
    {
        $this->_date = $date;
        return $this;
    }


}