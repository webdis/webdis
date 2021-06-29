<?php

namespace App\Controller;

use Delight\Cookie\Session;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Webdis\View\View;
use Webdis\Redis\Runner;

class DashboardController extends Controller
{
    public function main(){
        $loggedIn = $this->getLoggedIn();d

        if(!$loggedIn) {
            return new RedirectResponse('/');
        }

        $this->debugBarMessage('Welcome to Webdis');

        $this->debugBarMessage('You are in development mode, which is why you are seeing this.');

        $runner = new Runner($this->getClient());

        $view = new View('dashboard.dashboard', ['client' => $this->getClient(), 'connection' => $this->getConnection(), 'runner' => $runner]);

        return $this->response($view->get());
    }

    public function runCommand(){

    }
}