<?php

// tableau avec les valeurs de 0 à 3
//$tab = array(0,1,2,3);
$tab = ['zero' => 0, 'un' => 1, 'lol' => 'lulz'];
// var dump du tableau

echo '<pre>';
var_dump($tab);
echo '</pre>';

// boucle for

$size = sizeof($tab);
for ($i = 0; $i < $size; $i++) {
    echo 'coucou' . $tab[$i];
}


// boucle foreach

foreach ($tab as $k => $v) {

}

foreach ($tab as $v) {

}


?>

<?php for ($i = 0; $i < $size; $i++): ?>
    <div>
        <p>toto</p>
    </div>
<?php endfor; ?>





