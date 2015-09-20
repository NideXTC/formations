<?php

class RealImage implements ImageInterface
{
    private $filename;
    private $data;
    private $type;

    public function __construct($filename)
    {
        $this->type = pathinfo($filename, PATHINFO_EXTENSION);
        $this->filename = $filename;
        $this->data = file_get_contents($filename);
    }

    public function showImage()
    {
        echo '<img src="data:image/' . $this->type . ';base64,' . base64_encode($this->data) . '"/>';
    }
}