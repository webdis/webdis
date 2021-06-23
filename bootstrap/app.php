<?php

use App\Kernel;
use Delight\Cookie\Session;
use Symfony\Component\HttpFoundation\Request;
use Webdis\Config\Config;
use Webdis\Foundation\Application;

if(empty(session_id())){
    Session::start();
}

$whoops = new \Whoops\Run;
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
$whoops->register();

$request = Request::createFromGlobals();

require dirname(__DIR__) . '/routes/web.php';

$app = new Application(__DIR__, $routes);

$config = new Config();

$kernel = new Kernel($config);

$response = $app->handle($request);

$response->send();