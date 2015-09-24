<?php

class FeeTwenty implements OutputInterface
{
    public function load($price)
    {
        return ($price * 1.2);
    }
}