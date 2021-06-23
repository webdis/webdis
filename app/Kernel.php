<?php

namespace App;

use Webdis\Foundation\Kernel as BaseKernel;

class Kernel extends BaseKernel
{
    /**
     * Here is where gather things like our configs.
     */
    public function boot()
    {
        $this->config->add('app', '/config/app.php');
    }
}