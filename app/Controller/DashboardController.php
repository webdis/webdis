<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Webdis\View\View;

class DashboardController extends Controller
{
    public function main(){
        $loggedIn = $this->getLoggedIn();

        if(!$loggedIn) {
            return new RedirectResponse('/');
        }

        $view = new View('dashboard.dashboard');

        return $this->response($view->get());
    }

    public function runCommand(){

    }
}