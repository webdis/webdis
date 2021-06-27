<?php

use Webdis\Route\Route;
use Webdis\Route\RouteCollection;

$routes = new RouteCollection();

$routes->add('welcome', 
    new Route('/', ['WelcomeController', 'show'])
);

$routes->add('login_post', new Route('/', ['LoginController', 'afterForm'], ['POST']));

$routes->add('logout', new Route('/logout', ['LogoutController', 'logout'], ['POST']));

$routes->add('dashboard', new Route('/dashboard', ['DashboardController', 'main']));

$routes->add('view', new Route('/view', ['ViewController', 'show']));
