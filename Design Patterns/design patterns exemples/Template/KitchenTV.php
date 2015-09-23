<?php

class KitchenTV extends TVTemplate
{

    protected function channel()
    {
        return 'France2';
    }

    protected function show()
    {
        return 'Vivement dimanche';
    }
}