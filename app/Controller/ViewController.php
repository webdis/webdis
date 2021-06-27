<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;

class ViewController extends Controller
{
    public function view()
    {
        $request = Request::createFromGlobals();

        if(!$request->query->has('key'))
        {
            return $this->errorResponse(404);
        }
    }
}