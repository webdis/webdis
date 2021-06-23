<?php

namespace App\Controller;

use Delight\Cookie\Session;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Webdis\View\View;

class WelcomeController extends Controller {

    public function show()
    {
        if(session_id())
        {
            if(Session::has('logged_in')){
                return new RedirectResponse('/dashboard');
            }
        }

        $view = new View('welcome', ['variable' => 'wow']);

        return $this->response($view->get());
    }

}