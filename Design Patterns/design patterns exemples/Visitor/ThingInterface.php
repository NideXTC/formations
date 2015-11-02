<?php 

interface ThingInterface {
	public function accept(VisitorInterface $v);
}