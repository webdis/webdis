<?php

namespace Webdis\Foundation;

use Webdis\Config\Config;

class Kernel {
    private $config;

    public function __construct(Config $config)
    {
        $this->config = $config;
    }
}