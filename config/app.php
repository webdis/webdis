<?php

return [

    /**
     * This should be set to the url you use to access Webdis.
     */
    'url' => env('WEBDIS_URL', 'http://localhost'),
    
    /**
     * Set this to false if you're not developing the site, or if there's
     * not an issue with it. If there is, leave an issue in GitHub
     */
    'debug' => env('WEBDIS_DEBUG', false),

    /**
     * Leave this to false, DEMO mode is used for DEMO versions.
     * The demo version will reset the cache every single time.
     */
    'demo' => env('WEBDIS_DEMO', false),

    /**
     * If this is true, then instead of getting the default error pages, you'll get
     * The filp/whoops pretty handler, which shows exceptions.
     */
    'forcewhoops' => env('WEBDIS_FORCE_WHOOPS', false),
];