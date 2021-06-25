<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Webdis\View\View;
use Webdis\Redis\Runner;

class DashboardController extends Controller
{
    public function main(){
        $loggedIn = $this->getLoggedIn();

        if(!$loggedIn) {
            return new RedirectResponse('/');
        }

        $runner = new Runner($this->getClient());

        $view = new View('dashboard.dashboard', ['client' => $this->getClient(), 'connection' => $this->getConnection(), 'runner' => $runner]);

        return $this->response($view->get());
    }

    public function runCommand(){

    }
}