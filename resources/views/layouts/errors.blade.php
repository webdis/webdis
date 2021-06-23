<!DOCTYPE html>
<html>
    <head>
        <title>Whoops! Error @yield('code')</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="@asset('css/app.css')" />
    </head>
    <body>
        <div class="flex h-screen">
            <div class="m-auto">
                <div class="w-full mx-auto">
                    <img src="@asset('img/webdis-error.svg')" class="w-12 h-auto mx-auto" />
                </div>
                <p class="pt-2 text-3xl font-bold text-center md:text-4xl">Error @yield('code'), @yield('message')</p>
                <p class="text-2xl font-light text-center md:text-3xl">Webdis Version {{ \Webdis\Constant::VERSION }}</p>
            </div>
        </div>
    </body>
</html>