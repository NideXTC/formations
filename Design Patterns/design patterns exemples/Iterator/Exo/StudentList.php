<?php

/**
 * Class StudentList
 */
class StudentList
{
    /**
     * @var array
     */
    private $_array = [];

    /**
     * @param Student $student
     * @return $this
     */
    public function addStudent(Student $student)
    {
        $this->_array[] = $student;

        return $this;
    }

    public function getArray()
    {
        return $this->_array;
    }
}