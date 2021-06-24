<!DOCTYPE html>
<html>
    <head>
        <title>@yield('title') - Webdis</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="@asset('/css/app.css')" />
    </head>
    <body>
        @yield('content')
        <script src="@asset('/js/app.js')"></script>
    </body>
</html>