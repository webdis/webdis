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

        if(is_int($type))
        {
            if(extension_loaded('redis'))
                {
                  $type = match($type){
                    \Redis::REDIS_STRING => 'string',
                    \Redis::REDIS_SET => 'set',
                    \Redis::REDIS_LIST => 'list',
                    \Redis::REDIS_ZSET => 'zset',
                    \Redis::REDIS_HASH => 'hash',
                    default => 'type_not_found'
                  };
                }
        }

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