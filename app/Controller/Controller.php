<?php

namespace App\Controller;

use Delight\Cookie\Session;
use Predis\Client;
use Webdis\Controller\Controller as BaseController;

class Controller extends BaseController
{
    public function getClient() : Client
    {
        if(Session::get('require_password'))
        {
            $client = new Client([
                'scheme' => 'tcp',
                'host' => Session::get('host'),
                'port' => Session::get('port'),
                'password' => Session::get('password')
            ]);
        }
        else{
            $client = new Client([
                'scheme' => 'tcp',
                'host' => Session::get('host'),
                'port' => Session::get('port'),
            ]);
        }

        return $client;
        
    }

    public function getLoggedIn() : bool
    {
        return Session::has('logged_in');
    }
}