<?php


class Family extends Human
{
    private $_count;
    private $_array = [];

    public function __construct()
    {
        $this->_count = 0;
    }

    /**
     * @return mixed
     */
    public function getCount()
    {
        return $this->_count;
    }

    public function addMember(Human $human)
    {
        $this->_array[] = $human;
        $this->_count++;

        return $this;
    }

    public function getAgeSum()
    {
        $cptAge = 0;

        foreach ($this->_array as $v) {
            $cptAge += $v->getAge();
        }

        return $cptAge;
    }
}