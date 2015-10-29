<?php 

class Keyboard implements VisitorInterface {
	public function visit(ThingInterface $v){
		echo "COUCOU TV, ICI KEYBOARD !";
	}
}

