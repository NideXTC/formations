<?php

class ProxyImage implements ImageInterface
{
    private $image;
    private $filename;


    public function __construct($filename)
    {
        $this->filename = $filename;
    }


    public function showImage()
    {
        if ($this->image === null) {
            $this->image = new RealImage($this->filename);
        }

        $this->image->showImage();
    }
}