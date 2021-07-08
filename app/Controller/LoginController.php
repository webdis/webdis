<?php

namespace App\Controller;

use Delight\Cookie\Session;
use Predis\Client;
use Predis\Connection\ConnectionException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Webdis\Controller\Response;
use Webdis\Forms\Validator;
use Webdis\View\View;

class LoginController extends Controller
{

    /**
     * With this, we can check if we can connect to Redis. This will always verify using Predis,
     * because all we're doing is Pinging the server.
     *
     * @return void
     */
    public function afterForm(){

        $request = $this->getRequest();

        $validator = new Validator();

        $validator->validate($request->request->all(),[
            'host' => ['required'],
            'port' => ['required']
        ]);

        if($validator->is_valid){
            // Now we'll try our connection to the database

            if($request->request->get('password') == null){
                // If no password is added.

                $testConnection = new Client([
                    'scheme' => 'tcp',
                    'host' => $request->request->get('host'),
                    'port' => $request->request->get('port')
                ]);
            }
            else{
                // If we have a password.

                $testConnection = new Client([
                    'scheme' => 'tcp',
                    'host' => $request->request->get('host'),
                    'port' => $request->request->get('port'),
                    'password' => $request->request->get('password')
                ]);
            }
            try {
                // This will test that we've connected.
                // If the connection fails, this will throw an exception
                // If it connects BUT a password is required, it will throw an exception
                // Either way, we get false as the connectiong if it fails.
                $testConnection->ping();

                // We've connected with no exception.
                $connectSuccess = true;
            } catch(\Exception $e) {
                $connectSuccess = false;
            }

            
            if($connectSuccess){

                // Set the session variables, as required.
                // In a future version of Webdis, we'll also set the client here as well.
                Session::set('logged_in', true);
                Session::set('host', $request->request->get('host'));
                Session::set('port', $request->request->get('port'));

                // If we used a password, add the password, if not, just add that
                // there is no password.
                if($request->request->get('password') == null)
                {
                    Session::set('require_password', false);
                }
                else{
                    Session::set('require_password', true);
                    Session::set('password', $request->request->get('password'));
                }

                return new RedirectResponse('/dashboard');
            }
            else{

                // Since we failed to connect, we'll add the error message to it.

                // This will let us know if there was a password or not.
                if($request->request->get('password') == null){
                    $usedPassword = 'NO';
                }
                else{
                    $usedPassword = 'YES';
                }

                // Because we use an errors array, we'll add it here.

                $errors = ['one' => 'Failed to connect to tcp://' . $request->request->get('host') . ':' . $request->request->get('port') . ' Using Password: (' . $usedPassword . ')'];

                $view = new View('welcome', ['hasErrors' => true, 'errors' => $errors]);

                return $this->response($view->get());
            }

        }
        else{
            $view = new View('welcome', ['hasErrors' => true, 'errors' => $validator->errors]);
            
            return $this->response($view->get());
        }

    }
}