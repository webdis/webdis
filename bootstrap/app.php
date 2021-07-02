<?php

use App\Kernel;
use Delight\Cookie\Session;
use Dotenv\Dotenv;
use Monolog\Formatter\LineFormatter;
use Symfony\Component\HttpFoundation\Request;
use Webdis\Config\Config;
use Webdis\Foundation\Application;

if(!configCacheExists())
{
    $envLoad = Dotenv::createImmutable(dirname(__DIR__));
    $envLoad->load();
}

$config = new Config(dirname(__DIR__));

Config::store($config->config, $config->from);

if(str_contains(config('app.url'), 'https')){
    $secure = true;
}
else{ $secure = false; }

session_set_cookie_params(
    63113851,
    '/',
    parse_url(config('app.url'), PHP_URL_HOST),
    $secure);

if(empty(session_id())){
    Session::start();
}

// dd($_SESSION);

try {
    $pageCache = new PageCache\PageCache();
    $pageCache->config()
                    ->setCachePath(dirname(__DIR__) . '/storage/cache/pagecache/')
                    ->setEnableLog(true)
                    ->setLogFilePath(dirname(__DIR__) . '/storage/logs/pagecache.log')
                    ->setUseSession(true)
                    ->setSessionExcludeKeys(['logged_in', '__flash', '__previous', '__current', 'generated', 'debug', 'debugbar', 'debugbar_renderer', 'require_password', 'PHPDEBUGBAR_STACK_DATA'])
                    ->setSendHeaders(true)
                    ->setCacheExpirationInSeconds(3);
    $pageCache->init();
} catch (\Exception $e) {
    echo $e->getMessage();
}

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

$formatter = new LineFormatter(
    null, // Format of message in log, default [%datetime%] %channel%.%level_name%: %message% %context% %extra%\n
    null, // Datetime format
    true, // allowInlineLineBreaks option, default false
    true  // discard empty Square brackets in the end, default false
);

$logHandler = new Monolog\Handler\StreamHandler(dirname(__DIR__) . '/storage/logs/webdis.log' );

$logHandler->setFormatter($formatter);

$logger->pushHandler($logHandler);

// dd(config('security.key'));

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
