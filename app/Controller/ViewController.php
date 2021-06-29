<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class ViewController extends Controller
{
    public function show()
    {
        $loggedIn = $this->getLoggedIn();

        if(!$loggedIn) {
            return new RedirectResponse('/');
        }

        $request = Request::createFromGlobals();

        if(!$request->query->has('key'))
        {
            return $this->errorResponse(400);
        }

        if($request->query->get('key') == null)
        {
            return $this->errorResponse(400);
        }

        $key = $request->query->get('key');

        $client = $this->getClient();

        $type = $client->type($key);

        if($type == 'string')
        {
            $value = $client->get($key);
        }
        elseif($type == 'set')
        {
            $value = $client->smembers($key);
        }

        $view = $this->view('dashboard.view', ['key' => $key, 'type' => $type, 'value' => $value]);

        return $this->response($view);

        
    }
}