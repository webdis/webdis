<?php

use Symfony\Component\HttpFoundation\Request;
use Webdis\Foundation\Application;
use Webdis\View\View;

$whoops = new \Whoops\Run;
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
$whoops->register();

$request = Request::createFromGlobals();

require dirname(__DIR__) . '/routes/web.php';

$app = new Application(__DIR__, $routes);

$response = $app->handle($request);

$response->send();