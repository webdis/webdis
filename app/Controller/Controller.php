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

    public function getConnection(bool $array = false) : array|object
    {
        $connection = [
            'host' => Session::get('host'),
            'port' => Session::get('port'),
            'require_password' => Session::get('require_password'),
        ];
        if(!$array){
            $json = json_encode($connection);
            $connection = json_decode($json);
        }

        return $connection;

    }
}