<?php 

$str = 'Coucou =D'; 
$max = strlen($str);
$result = '';

for($i= 0; $i<$max; $i++){
	$ascii = ord($str[$i]);

	if($ascii > 96 && $ascii < 124){
		$str[$i] = chr($ascii-32);
	} 
} 

echo $str;