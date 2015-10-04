<?php

class FantasyMovie extends Movie
{
    public function getMovieName()
    {
        return 'Fantasy : ' . $this->getName();
    }
}