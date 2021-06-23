<?php

use Webdis\Route\Route;
use Webdis\Route\RouteCollection;

$routes = new RouteCollection();

$routes->add('welcome', 
    new Route('/', ['WelcomeController', 'show'])
);

$routes->add('login_post', new Route('/auth/check', ['LoginController', 'afterForm'], ['POST']));