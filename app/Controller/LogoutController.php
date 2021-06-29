<?php

namespace App\Controller;

use Delight\Cookie\Cookie;
use Delight\Cookie\Session;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LogoutController extends Controller
{
    public function logout(){
        $loggedIn = $this->getLoggedIn();

        if(!$loggedIn) {
            return new RedirectResponse('/');
        }

        $cookie_a = (new Cookie('webdis_a'));
        $cookie_b = (new Cookie('webdis_b'));
        
        $cookie_a->deleteAndUnset();
        $cookie_b->deleteAndUnset();

        session_unset();
        session_destroy();
        session_write_close();
        setcookie(session_name(),'',0,'/');

        return new RedirectResponse('/');
    }
}