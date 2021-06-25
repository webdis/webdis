<?php

namespace App\Controller;

use Webdis\Redis\Runner;
use Webdis\View\View;

class RunController extends Controller
{
    public function run()
    {

        $client = $this->getClient();

        $runner = new Runner($client);

        $args = $this->request()->request->get('command');

        $result = $runner->run($args);

        $view = new View('dashboard.runner', ['result' => $result, 'type' => gettype($result), 'command' => $args]);

        return $this->response($view->get());
    }
}