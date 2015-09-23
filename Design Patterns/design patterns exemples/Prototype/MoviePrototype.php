<?php

abstract class MoviePrototype
{
    protected $_title;
    protected $_category;

    abstract function __clone();

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->_title;
    }

    /**
     * @param mixed $title
     * @return $this
     */
    public function setTitle($title)
    {
        $this->_title = $title;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCategory()
    {
        return $this->_category;
    }

    /**
     * @param mixed $category
     * @return $this
     */
    public function setCategory($category)
    {
        $this->_category = $category;
        return $this;
    }


}