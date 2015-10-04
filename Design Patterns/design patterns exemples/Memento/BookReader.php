<?php

class BookReader
{
    private $title;
    private $page;

    function __construct($title_in, $page_in)
    {
        $this->setPage($page_in);
        $this->setTitle($title_in);
    }

    public function getPage()
    {
        return $this->page;
    }

    public function setPage($page_in)
    {
        $this->page = $page_in;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title_in)
    {
        $this->title = $title_in;
    }
}
