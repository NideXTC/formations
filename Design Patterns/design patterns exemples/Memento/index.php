<?php

require 'BookMark.php';
require 'BookReader.php';

$bookReader = new BookReader('Martine � la plage', '103');
$bookMark = new BookMark($bookReader);

echo $bookReader->getTitle() . $bookReader->getPage();

$bookReader->setPage("104");

$bookMark->setPage($bookReader);
echo '<br> Reader : ' . $bookReader->getPage();

$bookReader->setPage("1005");
echo '<br> Reader : ' . $bookReader->getPage();

$bookMark->getPage($bookReader);
echo '<br> Reader : ' . $bookReader->getPage();
