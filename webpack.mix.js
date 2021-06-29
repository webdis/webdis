let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/servicesworker.js', 'public/js')
    .setPublicPath('public')
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
    ]);