<?php

require 'ImageInterface.php';
require 'ProxyImage.php';
require 'RealImage.php';

$image1 = new ProxyImage("blow-your-mind.gif");
$image2 = new ProxyImage("thumbs-up.gif");


$image1->showImage();
$image1->showImage();
$image1->showImage();

$image2->showImage();
$image2->showImage();