<?php

class StudentListIterator
{
    private $_sl;
    private $_cpt = 0;

    public function __construct(StudentList $sl)
    {
        $this->_sl = $sl;
    }

    public function getCurrent()
    {
        return $this->_sl->getArray()[$this->_cpt];
    }

    public function hasNext()
    {
        return array_key_exists($this->_cpt + 1, $this->_sl->getArray());
    }

    public function getCount()
    {

    }

    public function getNext()
    {
        if ($this->hasNext()) {
            $this->_cpt++;
            return $this->_sl->getArray()[$this->_cpt];
        } else {
            return null;
        }
    }
}














