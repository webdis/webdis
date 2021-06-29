<?php

namespace App\Controller;

class SpecialController extends Controller
{

    public function webmanifest()
    {
        return $this->response($this->view('special.web-manifest'));
    }

}