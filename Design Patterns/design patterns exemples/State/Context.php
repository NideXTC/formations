<?php 

 class Context {
   private $state;

   public function __construct(){
      $this->state = null;
   }

   public function setState(State $state){
      $this->state = $state;		
   }

   public function getState(){
      return $this->state;
   }
}