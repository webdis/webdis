<?php

use App\Controller\LoginController;
use Delight\Cookie\Session;
use Symfony\Component\HttpFoundation\Request;
use Webdis\Tests\TestCase;

final class LoginTest extends TestCase
{
    /**
     * Tests if we can login using the LoginController
     *
     * @test 
     * @return boolean
     */
    public function canLogin()
    {

        $this->usesConfig()->usesSession();

        $login = new LoginController;

        $request = Request::create('/', 'POST', ['host' => config('redis.default-host'), 'port' => config('redis.default-port')]);

        $login->setRequest($request);

        $response = $login->afterForm();

        print_r($response->content);

        // $this->assertTrue(is_a($response, '\Symfony\Component\HttpFoundation\RedirectResponse'));
    }
}