<?php


class Student
{
    private $_name;
    private $_first_name;
    private $_gender;

    /**
     * Student constructor.
     * @param $_name
     * @param $_first_name
     * @param $_gender
     */
    public function __construct($_name, $_first_name, $_gender)
    {
        $this->_name = $_name;
        $this->_first_name = $_first_name;
        $this->_gender = $_gender;
    }


    public function study(){
        echo $this->_name . ' est en train d\'étudier';
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
     */
    public function setName($name)
    {
        $this->_name = $name;
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
     */
    public function setFirstName($first_name)
    {
        $this->_first_name = $first_name;
    }

    /**
     * @return mixed
     */
    public function getGender()
    {
        return $this->_gender;
    }

    /**
     * @param mixed $gender
     */
    public function setGender($gender)
    {
        $this->_gender = $gender;
    }


}



$alexis = new Student('Ducerf', 'Alexis', '18');

echo $alexis->getFirstName();
$alexis->setName('titi');

$alexis->study();

$james = new Student('Jim', 'James', '16');
echo '<br>';
$james->study();





