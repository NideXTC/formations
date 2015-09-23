<?php

abstract class Logger
{
    private $_next = null;

    public function setNext(Logger $logger)
    {
        $this->_next = $logger;
        return $this->_next;
    }

    public function log($message)
    {
        $this->_log($message);
        if ($this->_next !== null) {
            $this->_next->log($message);
        }
    }

    abstract protected function _log($message);
}