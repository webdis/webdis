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
        <meta charset="UTF-8" />
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
        <script src="@asset('js/app.js')"></script>
        <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
        @if(isset($debugbar))
        {!! $debugbar->render() !!}
        @endif
    </body>
</html>