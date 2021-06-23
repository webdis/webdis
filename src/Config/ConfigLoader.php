<?php

namespace Webdis\Config;

use Illuminate\Filesystem\Filesystem;
use Webdis\Config\Exceptions\ConfigFileNotFoundException;

class ConfigLoader implements \Serializable
{
    public string $name = '';

    public array $config = [];

    public function __construct(string $name = '', string $file = '')
    {
        $this->name = $name;

        $file = dirname(__DIR__, 2) . $file;

        $filesystem = new Filesystem();

        if(!$filesystem->exists($file))
        {
            throw new ConfigFileNotFoundException("Config File " . $file . 'not found');
        }
    }

    public function serialize()
    {
        
    }

    public function unserialize($data)
    {
        
    }
}