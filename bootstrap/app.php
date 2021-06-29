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

if(!configCacheExists())
{
    $envLoad = Dotenv::createImmutable(dirname(__DIR__));
    $envLoad->load();
}

$config = new Config(dirname(__DIR__));

Config::store($config->config, $config->from);

$whoops = new \Whoops\Run;

if(config('app.debug'))
{
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
}
elseif(config('app.forcewhoops'))
{
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
}
else
{
    $whoops->pushHandler(new \Webdis\Foundation\ProductionErrorHandler);    
}

$logger = new Monolog\Logger('webdis');
$logger->pushHandler(new Monolog\Handler\StreamHandler(dirname(__DIR__) . '/storage/logs/webdis.log' ));

$whoops->pushHandler(function ($exception, $inspector, $run) use($logger) {

    $logger->error(get_class($exception) . ' ' . $exception->getMessage() );
});

$whoops->register();

$request = Request::createFromGlobals();

require dirname(__DIR__) . '/routes/web.php';

$app = new Application(__DIR__, $routes);


$kernel = new Kernel($config);

$response = $app->handle($request);

$response->send();