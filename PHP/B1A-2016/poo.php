<?php


ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);


abstract class Humain
{
    private $_yeux;
    private $_bras;

    /**
     * Humain constructor.
     * @param $_yeux
     * @param $_bras
     */
    public function __construct()
    {
        $this->_yeux = 2;
        $this->_bras = 2;
    }

    /**
     * @return int
     */
    public function getYeux()
    {
        return $this->_yeux;
    }

    /**
     * @param int $yeux
     */
    public function setYeux($yeux)
    {
        $this->_yeux = $yeux;
    }

    /**
     * @return int
     */
    public function getBras()
    {
        return $this->_bras;
    }

    /**
     * @param int $bras
     */
    public function setBras($bras)
    {
        $this->_bras = $bras;
    }



    public function regarder()
    {

    }

    public function dormir()
    {

    }
}


class Etudiant extends Humain
{
    private $_nom;
    private $_age;
    private $_fournitures;
    private $_bq;

    /**
     * etudiant constructor.
     * @param $_nom
     * @param $_age
     * @param $_fournitures
     * @param $_bq
     */
    public function __construct($_nom, $_age, $_fournitures, $_bq)
    {
        parent::__construct();
        $this->_nom = $_nom;
        $this->_age = $_age;
        $this->_fournitures = $_fournitures;
        $this->_bq = $_bq;
    }


    public function etudier()
    {

    }

    public function ecouter()
    {

    }

    /**
     * @return mixed
     */
    public function getNom()
    {
        return $this->_nom;
    }

    /**
     * @param mixed $nom
     */
    public function setNom($nom)
    {
        $this->_nom = $nom;
    }

    /**
     * @return mixed
     */
    public function getAge()
    {
        return $this->_age;
    }

    /**
     * @param mixed $age
     */
    public function setAge($age)
    {
        $this->_age = $age;
    }

    /**
     * @return mixed
     */
    public function getFournitures()
    {
        return $this->_fournitures;
    }

    /**
     * @param mixed $fournitures
     */
    public function setFournitures($fournitures)
    {
        $this->_fournitures = $fournitures;
    }

    /**
     * @return mixed
     */
    public function getBq()
    {
        return $this->_bq;
    }

    /**
     * @param mixed $bq
     */
    public function setBq($bq)
    {
        $this->_bq = $bq;
    }

}


$alexis = new Etudiant('Alexis', '26', 'Stylo', '10€');

echo $alexis->getNom();

$alexis->setNom('Alexia');

echo $alexis->getNom();

echo 'Alexia a ' . $alexis->getYeux() . ' yeux';

$alexis->setBras(3);
$alexis->setYeux(3);

echo '<pre>';
print_r($alexis);
echo '</pre>';


$human = new Humain();
var_dump($human);







