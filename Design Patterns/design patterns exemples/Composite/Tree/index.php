<?php

require 'Leaf.php';
require 'OakLeaf.php';
require 'Tree.php';


$oak = new OakLeaf('Red');

$tree = new Tree();

$tree->addLeaf($oak);

echo $tree->getCount();