<!DOCTYPE html>
<html>
    <head>
        <title>@yield('title') - Webdis</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="@asset('css/app.css')" />
    </head>
    <body class="min-h-screen bg-gray-50">
        @component('navbar')

        <div class="min-h-screen py-2 mx-auto max-w-7xl">
            @yield('content')
        </div>

        @component('footer')
        <script src="@asset('js/app.js')"></script>
        <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    </body>
</html>