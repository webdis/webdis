<?php

namespace Webdis\Controller;

use Symfony\Component\HttpFoundation\Request;

class Controller implements ControllerInterface
{
    public function response(string $content, int $status = 200, array $headers = []): Response
    {
        return new Response($content, $status, $headers);
    }

    public function request() : Request
    {
        return Request::createFromGlobals();
    }

    public function errorResponse(int $status = 404)
    {
        return new ErrorResponse($status);
    }
}