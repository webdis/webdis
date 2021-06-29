<?php

namespace Webdis\Tests;

use Delight\Cookie\Session;
use Dotenv\Dotenv;
use PHPUnit\Framework\TestCase as BaseTestCase;
use Webdis\Config\Config;

class TestCase extends BaseTestCase
{
    public function usesConfig()
    {
        if(!configCacheExists())
        {
            $envLoad = Dotenv::createImmutable(dirname(__DIR__));
            $envLoad->load();
        }

        $config = new Config(dirname(__DIR__));

        Config::store($config->config, $config->from);

        return $this;
    }

    public function usesSession()
    {
        $_SESSION = null;

        return $this;
    }
}