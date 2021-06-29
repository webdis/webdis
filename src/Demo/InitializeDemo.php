<?php

namespace Webdis\Demo;

use Webdis\Cache\CacheConfig;
use Webdis\Cache\DevCache;

class InitializeDemo
{
    public bool $isDemo = false;

    public function __construct(bool $isDemo = false)
    {
        $this->isDemo = $isDemo;
    }

    public function create()
    {
        
        $devcache = new DevCache(dirname(__DIR__, 2), dirname(__DIR__ , 2) . '/storage/cache/views');

        $devcache->deleteViewCache();
    }
}