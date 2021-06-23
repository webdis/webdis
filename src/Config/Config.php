<?php

namespace Webdis\Config;

class Config implements \IteratorAggregate, \Countable
{

    public array $config = [];

    private int $count = 0;

    public function __construct()
    {
        
    }

    public function add(string $name, string $file)
    {
        $load = new ConfigLoader($name, $file);

        $this->count++;
    }

    public function getIterator()
    {
        
    }

    public function count()
    {
        return $this->count;
    }
}