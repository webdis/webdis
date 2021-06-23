<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;

class DashboardController extends Controller
{
    public function main(){
        $loggedIn = $this->getLoggedIn();

        if(!$loggedIn) {
            return new RedirectResponse('/');
        }

        
    }

    public function runCommand(){

    }
}