<?php

require 'Product.php';
require 'ListOfProduct.php';
require 'ListOfProductArray.php';

// NOOOOPPPPPEEE

$list = new ListOfProduct();
$bigList = $list->fetchAll();

foreach ($bigList as $product) {
    echo $product->getName() . '<br>';
}



// FLYWEIGHT MAGUEULE

$list = new ListOfProductArray();
$bigList = $list->fetchAll();

$product2 = new Product('',0);

foreach ($bigList as $v) {
    $product2->hydrate($v);

    echo $product2->getName() . '<br>';
}
