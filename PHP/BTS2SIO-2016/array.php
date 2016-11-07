<?php 

$array = [
	'BTS1' => [ 
		'a' => [0,10],
		'b' => [2,8],
		'c' => [5,6]
	], 
	'BTS2' => [
		'a' => [1,8],
		'b' => [6,5],
		'c' => [6,2]
	]
];

// Passage par référence 


function average($class) {
	$sum = 0; 
	$number = 0; 

	foreach ($class as $student) {
		foreach ($student as $scores) {
			foreach ($scores as $score ) {
				$sum += $score;
				$number++;
			}
		}
	}

	return $sum/$number;
}

function averagePerClass($class) {
	$sum = []; 
	$number = [];
	$total = []; 

	foreach ($class as $key => $student) {
		foreach ($student as $scores) {
			foreach ($scores as $score ) {
				$sum[$key] += $score;
				$number[$key]++;
			}
		}

		$total[$key] = $sum[$key]/$number[$key];
	}

	return $total; 
}

function maximum($class){
	$max = 0; 

	foreach ($class as $student) {
		foreach ($student as $scores) {
			foreach ($scores as $score ) {
				if($score > $max){
					$max = $score;
				}
			}
		}
	}
	return $max;
}

function minimum($class){
	$min = 10; 

	foreach ($class as $student) {
		foreach ($student as $scores) {
			foreach ($scores as $score ) {
				if($score < $min){
					$min = $score;
				}
			}
		}
	}
	return $min;
}

echo average($array).PHP_EOL;
print_r(averagePerClass($array));
echo maximum($array).PHP_EOL;
echo minimum($array).PHP_EOL;


