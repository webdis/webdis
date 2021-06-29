#!/usr/bin/env php
<?php
// application.php

require dirname(__DIR__) .'/vendor/autoload.php';

use Symfony\Component\Console\Application;
use Webdis\Console\Cache\CacheConfig;

$application = new Application("Webdis Console", '0.0.1-alpha');

// ... register commands

$application->add(new CacheConfig());

$application->run();