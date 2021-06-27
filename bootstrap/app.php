<?php

use App\Kernel;
use Delight\Cookie\Session;
use Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Request;
use Webdis\Config\Config;
use Webdis\Foundation\Application;

if(empty(session_id())){
    Session::start();
}


$config = Dotenv::createImmutable(dirname(__DIR__));
$config->load();

$whoops = new \Whoops\Run;
if($_ENV['WEBDIS_DEBUG'] == "true")
{
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
}
else
{
    $whoops->pushHandler(new \Webdis\Foundation\ProductionErrorHandler);    
}
$whoops->register();

$request = Request::createFromGlobals();

require dirname(__DIR__) . '/routes/web.php';

$app = new Application(__DIR__, $routes);

$config = new Config();

$kernel = new Kernel($config);

$response = $app->handle($request);

$response->send();