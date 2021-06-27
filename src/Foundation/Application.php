<?php

namespace Webdis\Foundation;

use DebugBar\DataCollector\MessagesCollector;
use DebugBar\DebugBar;
use Delight\Cookie\Cookie;
use Delight\Cookie\Session;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection as RoutingRouteCollection;
use Webdis\Cache\CacheConfig;
use Webdis\Cache\DevCache;
use Webdis\Controller\Response as ControllerResponse;
use Webdis\Foundation\Exceptions\ResponseNotValidException;
use Webdis\Route\RouteCollection;
use Webdis\View\View;

class Application implements HttpKernelInterface {

    public string $root;

    public RouteCollection $routes;

    public function __construct(string $dir, RouteCollection $routes)
    {
        $this->root = dirname($dir);

        $this->routes = $routes;
    }

    public function handle(Request $request, int $type = self::MAIN_REQUEST, bool $catch = true)
    {
        $symfonyRoute = new RoutingRouteCollection();

        if(!Session::has('__previous')){
            Session::set('__previous', '');
        }

        if(Session::has('__current'))
        {
            if(!Session::get('__current') == $request->getPathInfo())
            {
                Session::set('__previous', Session::get('__current'));
            }
        }

        if(Session::has('__flash'))
        {
            if(Session::get('__flash') != '')
            {
                Session::set('flash', Session::get('__flash'));
                Session::set('__flash', '');
            }
        }
        else{
            Session::set('__flash', '');
            if(Session::has('flash'))
            {
                Session::delete('flash');
            }
        }

        Session::set('__current', $request->getPathInfo());

        if(!Cookie::exists('webdis_a'))
        {
            $rand = random_bytes(25);
            $cookie = crypt(base64_encode($rand), config('security.key'));

            Cookie::setcookie('webdis_a', base64_encode($cookie));
            Cookie::setcookie('webdis_b', $rand);

            Session::set('generated', true);
        }
        else{
            if(Cookie::get('webdis_a') !== base64_encode(crypt(base64_encode(Cookie::get('webdis_b')), config('security.key')))){
                $error = new View('errors.generic', ['code' => 419, 'message' => 'Page Expired ' ]);
                
                $cookie_a = (new Cookie('webdis_a'));
                $cookie_b = (new Cookie('webdis_b'));

                $cookie_a->deleteAndUnset();
                $cookie_b->deleteAndUnset();

                return new Response($error->get(), 419);
            }
        }

        if(!Session::has('generated')){
            Session::regenerate(true);
            $cookie_a = (new Cookie('webdis_a'));
            $cookie_b = (new Cookie('webdis_b'));
            
            $cookie_a->deleteAndUnset();
            $cookie_b->deleteAndUnset();

            $error = new View('errors.generic', ['code' => 419, 'message' => 'Page Expired ' ]);
            return new Response($error->get(), 419);
        }

        if(config('app.debug'))
        {
            Session::set('debug', true);

            $devCache = new DevCache($this->root, $this->root . '/storage/cache/views');

            $devCache->deleteViewCache();

            $debugbar = new DebugBar();

            $debugbar->addCollector(new MessagesCollector());

            $renderer = $debugbar->getJavascriptRenderer();

            Session::set('debugbar', $debugbar);

            Session::set('debugbar_renderer', $renderer);
        }
        else {
            Session::set('debug', false);
        }
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
            if(is_a($result, 'Symfony\Component\HttpFoundation\RedirectResponse'))
            {
                return $result;
            }
            elseif(is_a($result, 'Webdis\Controller\Response'))
            {
                return new Response($result->content, $result->status, $result->headers);
            }
            elseif(is_a($result, 'Webdis\Controller\ErrorResponse'))
            {
                $view = new View('errors.generic', ['code' => $result->error, 'message' => $result->errorText]);

                return new Response($view->get(), $result->error);
            }
            else{
                // Error 500
                if( config('app.debug') ){
                    // Hope that whoops helped with there error and assume it didn't so we can run a server error


                    Throw new ResponseNotValidException('Response type is not allowed', 500);

                }
                else{
                    $view = new View('errors.generic', ['code' => 500, 'message' => 'Server Error']);
                    return new Response($view->get(), 500);
                }

            }
    }

    public function terminate(Request $request, Response $response): void
    {

    }
    

}