<?php

use Jenssegers\Agent\Agent;
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

if(!function_exists('random_string'))
{
    function random_string($length = 32)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}

if(!function_exists('userInfo'))
{
    function userInfo(string $type = '')
    {
        $agent = new Agent();

        if($type == 'os')
        {
            return $agent->platform();
        }
        elseif($type == 'browser')
        {
            return $agent->browser();
        }
        elseif($type == 'browser.version')
        {
            return $agent->version($agent->browser());
        }
        else
        {
            return null;
        }
    }
}