<?php



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