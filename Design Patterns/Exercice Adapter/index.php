-index-


$calculatrice = new Calculatrice();

echo $calculatrice->calcul('1+1'); //2 
echo $calculatrice->calcul('2-1'); //1 


-Sum- 


class Sum 
{
    public function addition($v1,$v2)
    {    
        return $v1+$v2;
    }
}




-Calculator-


class Calculator()
{
   private $_sum ;
   private $_sub ;
   
   
    public function __construct()
    {
        $this->_sum = new Sum();
        $this->_sub = new Sub();
    }
    
    
    public function calcul($string)
    {
       
       if(strpos($string, '+') == true){
           SUM
       } else {
           SUB 
       }
       
        **Chercher si il y a un +** 
            **récupère les 2 valeurs**
                **appelle la fonction addition de la classe Sum** 
                
        **Chercher si il y a un -** 
            **récupère les 2 valeurs**
                **appelle la fonction addition de la classe Sub** 
                
    
    }
}