<?php 

class User extends Human implements Toto{
	private $_name, 
	$_prenom,
	$_email, 
	$_password;

    public static $array = ['a','b'];

    /**
     * User constructor.
     * @param $_name
     * @param $_prenom
     * @param $_email
     * @param $_password
     */
    public function __construct($_name=null, $_prenom=null, $_email=null, $_password=null)
    {
        $this->_name = $_name;
        $this->_prenom = $_prenom;
        $this->_email = $_email;
        $this->_password = $_password;
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
    public function getPrenom()
    {
        return $this->_prenom;
    }

    /**
     * @param mixed $prenom
     */
    public function setPrenom($prenom)
    {
        $this->_prenom = $prenom;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->_email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->_email = $email;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->_password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->_password = $password;
        return $this;
    }

    function toto()
    {
        // TODO: Implement toto() method.
    }

    function tata()
    {
        // TODO: Implement tata() method.
    }
}

function test(Toto $a){
    $a->tata();
}


$user = new User();
$user->setName('toto')
->setPrenom('toto')
->setEmail('toto');









