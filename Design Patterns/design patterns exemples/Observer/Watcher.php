<?php

class Watcher implements SplObserver
{
    private $name;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function update(SplSubject $subject)
    {
        echo $this->name . ' regarde actuellement ' . $subject->getContent() . '</b><br>';
    }
}