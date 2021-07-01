<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Webdis\Redis\Runner;
use Webdis\View\View;

class RunController extends Controller
{
    public function run()
    {
        $loggedIn = $this->getLoggedIn();

        if(!$loggedIn) {
            return new RedirectResponse('/');
        }

        $client = $this->getClient();

        $runner = new Runner($client);

        $args = $this->request()->request->get('command');

        $result = $runner->run($args);

        if($result == false)
        {
            // method probably doesn't exist.
        }

        $lastRows = $runner->lastRows();

        $array = explode(' ' , $args);

        $argDoes = match ($array[0]) {
            'keys', 'KEYS', 'get', 'GET' => 'return',
            'set', 'SET', 'sadd', 'SADD' => 'create',
            default => 'error',
        };

        $view = new View('dashboard.runner', ['result' => $result,'lastRows' => $lastRows , 'type' => gettype($result), 'command' => $args, 'commandDoes' => $argDoes]);

        return $this->response($view->get());
    }
}