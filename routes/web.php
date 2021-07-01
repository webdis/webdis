<?php

use Webdis\Route\Route;
use Webdis\Route\RouteCollection;

$routes = new RouteCollection();

$routes->add('welcome', 
    new Route('/', ['WelcomeController', 'show'])
);

// Special Routes
$routes->add('webmanifest', new Route('/site.webmanifest', ['SpecialController', 'webmanifest']));

$routes->add('service-worker-offline', new Route('/offline', ['SpecialController', 'offline']));


// Auth routes
$routes->add('login_post', new Route('/', ['LoginController', 'afterForm'], ['POST']));

$routes->add('logout', new Route('/logout', ['LogoutController', 'logout'], ['POST']));

// Dashboard
$routes->add('dashboard', new Route('/dashboard', ['DashboardController', 'main']));

// View
$routes->add('view', new Route('/view', ['ViewController', 'show']));


// Runs commands, requires POST
$routes->add('runner', new Route('/run', ['RunController', 'run'], ['POST']));
