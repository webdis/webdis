<?php

namespace App\Controller;

use Delight\Cookie\Session;
use Predis\Client;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Webdis\Controller\Controller as BaseController;
use Webdis\View\View;

class Controller extends BaseController
{
    private $request;

    public function getClient() : Client|\Redis
    {
        if(config('redis.client') == 'ext')
        {
            $client = new \Redis();

            if(config('redis.client') == 'predis'){

                if(Session::get('require_password'))
                {
                    
                    $client->connect(Session::get('host'), Session::get('port'), ['auth' => [Session::get('password')]]);
                }
                else
                {
                    $client->connect(Session::get('host'), Session::get('port'));
                }

            }

            else
            {
                if(Session::get('require_password'))
                {
                    $client->connect(Session::get('host'), Session::get('port'));
                    $client->auth(Session::get('password'));
                }
                else
                {
                    $client->connect(Session::get('host'), Session::get('port'));
                }
            }
        }
        else{
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
        
        }
        return $client;
        
    }

    public function __construct()
    {
        $this->request = Request::createFromGlobals();
    }

    public function getLoggedIn() : bool
    {
        return Session::has('logged_in');
    }

    public function getRequest() : Request
    {
        
        return $this->request;
    }

    public function setRequest($request) : void
    {
        $this->request = $request;
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

    public function debugBarMessage(string $message, $type = 'info')
    {

        if(config('app.debug')){
            $debugbar = Session::get('debugbar');
            
            $debugbar['messages']->{$type}($message);
            
            Session::set('debugbar', $debugbar);
        }
    }

    public function view(string $name, array $data = []) : string
    {
        $view = new View($name, $data);

        return $view->get();
    }
}