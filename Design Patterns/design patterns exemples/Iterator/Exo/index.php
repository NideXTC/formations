<?php

require 'Student.php';
require 'StudentList.php';
require 'StudentListIterator.php';


$student1 = new Student('Josay', 'Posay');
$student2 = new Student('Marty', 'McFly');
$student3 = new Student('Manuel', 'Valls');

$list = new StudentList();
$iterator = new StudentListIterator($list);


$list->addStudent($student1)->addStudent($student2)->addStudent($student3);


while ($iterator->hasNext()) {

    echo 'ELEMENT COURANT : <br>';
    echo '<pre>';
    var_dump($iterator->getCurrent());
    echo '</pre>';


    echo 'ELEMENT SUIVANT: <br>';
    echo '<pre>';
    var_dump($iterator->getNext());
    echo '</pre>';
}











