<?php 

$a=0;
function fibo($start, $next, $limit){
	global $a; 
	if($limit <= $a) return false;
	$a++;

	echo $start+$next.PHP_EOL;
	fibo($next, $start+$next, $limit);
}
fibo(0,1,10);

