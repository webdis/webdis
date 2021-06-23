<?php

namespace Webdis\Foundation;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection as RoutingRouteCollection;
use Webdis\Controller\Response as ControllerResponse;
use Webdis\Route\RouteCollection;
use Webdis\View\View;

class Application implements HttpKernelInterface {

    public string $root;

    public RouteCollection $routes;

    public function __construct(string $dir, RouteCollection $routes)
    {
        $this->root = basename($dir);

        $this->routes = $routes;
    }

    public function handle(Request $request, int $type = self::MAIN_REQUEST, bool $catch = true): Response
    {
        $symfonyRoute = new RoutingRouteCollection();

        foreach($this->routes->all() as $route)
        {
            $symfonyRoute->add($route->getName(), new Route($route->getPath(), $route->getDefaults(), $route->getRequirements(), $route->getOptions(), $route->getHost(), $route->getSchemes(), $route->getMethods(), $route->getCondition()));
        }

        $match = false;

        foreach($symfonyRoute->all() as $symroute)
        {
            if($symroute->getPath() == $request->getPathInfo()){

                if( in_array($request->getMethod(), $symroute->getMethods() ) ){

                    $match = $symroute;

                }
            }
        }

        if($match == false){
            $errorfourohfour = new View('errors.404', ['code' => 404, 'message' => 'Page Not Found']);
            $result = new ControllerResponse($errorfourohfour->get(), 404);
        }
        else{

            $getController = explode('::', $match->getDefault('_controller'));

            $controller = new $getController[0];

            $result = $controller->{$getController[1]}();
        
        }
            return new Response($result->content, $result->status, $result->headers);
    }

    public function terminate(Request $request, Response $response): void
    {

    }
    

}