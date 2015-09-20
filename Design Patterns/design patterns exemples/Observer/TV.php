<?php

class TV implements SplSubject
{
    private $name;
    private $observers = array();
    private $content;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function attach(\SplObserver $observer)
    {
        $this->observers[] = $observer;
    }

    public function detach(\SplObserver $observer)
    {
        $key = array_search($observer, $this->observers, true);
        if (false !== $key) {
            unset($this->observers[$key]);
        }
    }

    public function movie($content)
    {
        $this->content = $content;
        $this->notify();
    }

    public function getContent()
    {
        return $this->content . " sur " . $this->name;
    }

    public function notify()
    {
        foreach ($this->observers as $value) {
            $value->update($this);
        }
    }
}