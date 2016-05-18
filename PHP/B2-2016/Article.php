<?php

/**
 * Created by PhpStorm.
 * User: NideXTC
 * Date: 18/05/2016
 * Time: 11:11
 */
class Article
{
    private $_id,
        $_name,
        $_author,
        $_text;

    /**
     * Article constructor.
     * @param $_id
     * @param $_name
     * @param $_author
     * @param $_text
     */
    public function __construct($_id = null, $_name = null, $_author = null, $_text = null)
    {
        $this->_id = $_id;
        $this->_name = $_name;
        $this->_author = $_author;
        $this->_text = $_text;
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
    public function getAuthor()
    {
        return $this->_author;
    }

    /**
     * @param mixed $author
     * @return mixed $this
     */
    public function setAuthor($author)
    {
        $this->_author = $author;
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


}