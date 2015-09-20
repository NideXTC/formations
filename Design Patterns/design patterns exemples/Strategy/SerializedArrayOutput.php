<?php

class SerializedArrayOutput implements OutputInterface
{
    public function load($array)
    {
        return serialize($array);
    }
}