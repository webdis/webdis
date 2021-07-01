<?php

return [
    'client' => env('WEBDIS_CLIENT', 'predis'),
    'default-host' => env('WEBDIS_DEFAULT_HOST', 'localhost'),
    'default-port' => env('WEBDIS_DEFAULT_PORT', 6379),
];