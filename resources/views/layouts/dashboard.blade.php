<!DOCTYPE html>
<html>
    <head>
        @php
            if(\Delight\Cookie\Session::get('debug'))
            {
                $debugbarGet = \Delight\Cookie\Session::get('debugbar');
                $debugbar = \Delight\Cookie\Session::get('debugbar_renderer');    
            }
        @endphp

        <title>@yield('title') - Webdis</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#fefefe">
        <meta charset="UTF-8" />
        <meta name=”robots” content=”noindex,nofollow”>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="@asset('css/app.css')" />
        @if(isset($debugbar))
        <style>
            {!! $debugbar->dumpCssAssets() !!}
        </style>
        <script>
        {!! $debugbar->dumpJsAssets() !!}
        </script>
        @endif
    </head>
    <body class="min-h-screen bg-gray-50">
        @component('navbar')

        <div class="min-h-screen py-2 mx-auto max-w-7xl">
            @yield('content')
        </div>

        @component('footer')
        <script src="@asset('/js/app.js')"></script>
        <script defer src="@asset('/js/alpine.js')"></script>
        @if(isset($debugbar))
        {!! $debugbar->render() !!}
        @endif
    </body>
</html>
