<?php 

class TV implements ThingInterface {
	public function accept(VisitorInterface $v){
		$v->visit($this);
	}
}