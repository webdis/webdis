<div class="w-screen py-4 bg-white border-t border-gray-200">
    <div class="px-2 mx-auto font-light text-right max-w-7xl">
        Webdis Version {{ \Webdis\Constant::VERSION }}  <br> Connected to Redis using the @if(config('redis.client') == 'predis')<a href="https://github.com/predis/predis" class="text-normal">Predis\Predis</a> PHP Package. @else Redis PHP Extension. @endif <br> <br> Operating System: {{ userInfo('os') }} <br> Browser: {{ userInfo('browser') }} {{ userInfo('browser.version') }}.
    </div>
</div>