<?php

namespace App\Controller;

use Delight\Cookie\Session;
use Predis\Client;
use Predis\Connection\ConnectionException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Webdis\Controller\Response;
use Webdis\Forms\Validator;
use Webdis\View\View;

class LoginController extends Controller
{
    public function afterForm(){
        $request = Request::createFromGlobals();

        $validator = new Validator();

        $validator->validate($request->request->all(),[
            'host' => ['required'],
            'port' => ['required']
        ]);

        if($validator->is_valid){
            // Now we'll try our connection to the database

            if($request->request->get('password') == null){
                $testConnection = new Client([
                    'scheme' => 'tcp',
                    'host' => $request->request->get('host'),
                    'port' => $request->request->get('port')
                ]);
            }
            else{
                $testConnection = new Client([
                    'scheme' => 'tcp',
                    'host' => $request->request->get('host'),
                    'port' => $request->request->get('port'),
                    'password' => $request->request->get('password')
                ]);
            }
            try {
                $testConnection->ping();

                $connectSuccess = true;
            } catch(ConnectionException $e) {
                $connectSuccess = false;
            }

            if($connectSuccess){
                // SUCCESS!
                Session::set('logged_in', true);
                Session::set('host', $request->request->get('host'));
                Session::set('port', $request->request->get('port'));
                if($request->request->get('password') == null)
                {
                    Session::set('require_password', false);
                }
                else{
                    Session::set('require_password', true);
                    Session::get('password', $request->request->get('password'));
                }

                return new RedirectResponse('/dashboard');
            }
            else{

                // Failure

                if($request->request->get('password') == null){
                    $usedPassword = 'NO';
                }
                else{
                    $usedPassword = 'YES';
                }

                $errors = ['one' => 'Failed to connect to tcp://' . $request->request->get('host') . ':' . $request->request->get('port') . ' Using Password: (' . $usedPassword . ')'];

                $view = new View('welcome', ['hasErrors' => true, 'errors' => $errors]);

                return $this->response($view->get());
            }

        }
        else{
            // $view = new View('wel[come', ['hasErrors' => true, 'errors', $validator->errors]);
            
            return new RedirectResponse('/');
        }

    }
}