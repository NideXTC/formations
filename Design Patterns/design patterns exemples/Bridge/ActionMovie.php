<?php

class ActionMovie extends Movie
{
    public function getMovieName()
    {
        return 'Action : ' . $this->getName();
    }
}