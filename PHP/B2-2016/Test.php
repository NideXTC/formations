<?php

class Test
{
    public function sayHello(GlobalInterface $o)
    {
        return $o->coucou();
    }
}