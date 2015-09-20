<?php


class JsonStringOutput implements OutputInterface
{
    public function load($array)
    {
        return json_encode($array);
    }
}