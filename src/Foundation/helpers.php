<?php

use Symfony\Component\Filesystem\Filesystem;
use Webdis\Config\Config;

if(! function_exists('config'))
{
    function config($key)
    {
        return Config::get($key);
    }
}

if(! function_exists('configCacheExists'))
{
    function configCacheExists()
    {
        $filesystem = new Filesystem();

        return $filesystem->exists(dirname(__DIR__, 2) . '/storage/config/cache');
    }
}

if(!function_exists('env'))
{
    function env($key, $default = null)
    {
        if(isset($_ENV[$key]))
        {
            return $_ENV[$key];
        }
        else
        {
            return $default;
        }
    }
}

if(!function_exists('allConfig'))
{
    function allConfig()
    {
        return Config::all();
    }
}