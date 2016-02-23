<?php 

$duration = 35; 
$max = 300000; 
$fee = 1; 
$price = 2; 

for($i=0; $i<$duration;$i++){
	if($i%2 === 0){
		$fee -= 1;		
	} else {
		$fee +=1.5;
	}
}

for($i=0; $i<$duration;$i++){
	if($i%2 === 0){
		$fee = 0.99;		
	} else {
		$fee = 1.015;		
	}	

	$max /= $fee;
}

echo $max;