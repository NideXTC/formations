<?php

require 'OutputInterface.php';
require 'SerializedArrayOutput.php';
require 'JsonStringOutput.php';
require 'ArrayOutput.php';

class Client
{
    private $output;

    public function setOutput(OutputInterface $outputType)
    {
        $this->output = $outputType;
    }

    public function loadOutput($array)
    {
        return $this->output->load($array);
    }
}