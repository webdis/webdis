<?php

namespace Webdis\Config;

use Dflydev\DotAccessData\Data;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

class Config
{
    public array $config = [];

    public string $from;

    static array $staticConfig;

    static string $staticFrom;

    public function __construct($root)
    {
        $filesystem = new Filesystem;

        if($filesystem->exists($root . '/storage/cache/config.php'))
        {
            $this->config = include $root . '/storage/cache/config.php';

            $this->from = 'cache';
        }
        else{
            $finder = new Finder;

            $configFiles = $finder->files()->name('*.php')->in($root . '/config');

            foreach($configFiles as $file)
            {
                $configArray = [];

                $fileArray = include $file->getRealPath();

                $fileArrayWithName[$file->getBasename('.php')] = $fileArray;

                $count = array_push($configArray, $fileArrayWithName) - 1;

                $this->config = $configArray[$count];

                $this->from = 'folder';
            }

            
        }
    }

    static function store($config, $from)
    {
        self::$staticConfig = $config;

        self::$staticFrom = $from;
    }

    static function get(string $key = '') : mixed
    {
        $config = new Data(self::$staticConfig);

        if($config->has($key))
        {
            return $config->get($key);
        }
        else
        {
            return null;
        }
    }

    static function all(): array
    {
        return self::$staticConfig;
    }

}