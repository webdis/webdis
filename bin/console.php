#!/usr/bin/env php
<?php
// application.php

require dirname(__DIR__) .'/vendor/autoload.php';

use Symfony\Component\Console\Application;
use Webdis\Console\Cache\CacheConfig;
use Webdis\Console\Cache\ViewCacheReset;
use Webdis\Constant;

$application = new Application("Webdis Console", Constant::VERSION);

// ... register commands

$application->add(new CacheConfig());
$application->add(new ViewCacheReset());

$application->run();