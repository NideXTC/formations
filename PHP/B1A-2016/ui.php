<?php

$result = [
    [
        'id' => 1,
        'name' => 'nom 1'
    ],
    [
        'id' => 2,
        'name' => 'nom 2'
    ]
];

echo '<table border="1">';
echo '<tr>';
    echo '<th> id </th>';
    echo '<th> nom </th>';
    echo '<th> actions </th>';
echo '</tr>';

foreach ($result as $item) {
    echo '<tr>';
    echo '<td>'.$item['id'].'</td>';
    echo '<td>'.$item['name'].'</td>';
    echo '<td><a href="update.php?id='.$item['id'].'">Modifier</a></td>';
    echo '</tr>';
}
echo '</table>';
