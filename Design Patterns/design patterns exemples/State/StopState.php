<?php 
class StopState implements State {
	public function doSomething(Context $context){
		echo "STOP !";
		$context->setState($this);
	}
}