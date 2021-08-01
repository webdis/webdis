@extends('layouts.dashboard')

@section('title', 'About')

@section('content')

<div class="px-2 py-12 mx-auto max-w-7xl">
    <div class="grid grid-cols-1 sm:grid-cols-2">
        <div>
            <h1 class="text-3xl font-extrabold md:text-4xl">Webdis</h1>
            <p class="mb-4 text-xl font-extrabold md:text-2xl">Version {{ \Webdis\Constant::VERSION }}</p>
            <div class="prose prose-md">
                <h2>Credits</h2>
                <ul>
                    <li><a href="https://github.com/elijahcruz12" target="_blank" rel=”noreferrer”>Elijah Cruz</a></li>
                </ul>
            </div>
            
        </div>

        <div class="prose prose-md">
            <h2>Projects Used in Webdis</h2>

            <ul>
                <li><a href="https://laravel.com/" target="_blank" rel=”noreferrer”>Laravel</a></li>
                <li><a href="https://symfony.com/" target="_blank" rel=”noreferrer”>Symfony</a></li>
                <li><a href="https://tailwindcss.com/" target="_blank" rel=”noreferrer”>TailwindCSS</a></li>
                <li><a href="https://alpinejs.dev/" target="_blank" rel=”noreferrer”>AlpineJS</a></li>
                <li><a href="https://github.com/predis/predis" target="_blank" rel=”noreferrer”>Predis</a></li>
                <li><a href="https://packagist.org/packages/delight-im/cookie" target="_blank" rel=”noreferrer”>delight-im/cookie</a></li>
                <li><a href="https://packagist.org/packages/vlucas/phpdotenv" target="_blank" rel=”noreferrer”>vlucas/phpdotenv</a></li>
                <li><a href="https://github.com/filp/whoops" target="_blank" rel=”noreferrer”>filp/whoops</a></li>
                <li><a href="https://seldaek.github.io/monolog/" target="_blank" rel=”noreferrer”>monolog/monolog</a></li>
            </ul>

        </div>
        
    </div>
</div>

@endsection