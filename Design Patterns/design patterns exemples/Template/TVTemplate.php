<?php

abstract class TVTemplate
{


    /**
     * On place la fonction en final pour laisser tout le "pouvoir" à la classe parente
     */
    public final function watch()
    {
        echo $this->channel() . ' - ' . $this->show();
    }

    abstract protected function channel();

    abstract protected function show();
}