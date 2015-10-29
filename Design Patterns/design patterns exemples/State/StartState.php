<?php 
class StartState implements State {
	public function doSomething(Context $context){
		echo "Here we go !";
		$context->setState($this);
	}
}