<?php

namespace App\Controller;

use Webdis\View\View;

class WelcomeController extends Controller {

    public function show()
    {
        $view = new View('welcome', ['variable' => 'wow']);

        return $this->response($view->get());
    }

}