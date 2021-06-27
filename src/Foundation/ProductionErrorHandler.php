<?php

namespace Webdis\Foundation;

use Webdis\View\View;
use Whoops\Handler\Handler;

class ProductionErrorHandler extends Handler
{
    public function handle()
    {
        $view = new View('errors.generic', ['code' => 500, 'message' => 'Server Error']);

        echo $view->get();

        return Handler::DONE;
    }
}