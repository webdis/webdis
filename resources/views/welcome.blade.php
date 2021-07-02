@extends('layouts.minimal')

@section('title', 'Welcome')

@section('content')
<div class="flex flex-col justify-center min-h-screen py-12 bg-gray-50 dark:bg-gray-800 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="w-auto h-12 mx-auto" src="@asset('/img/webdis.svg')" alt="Webdis">
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-gray-50">
        Webdis
      </h2>
      <p class="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
        The Admin Web App For Redis
      </p>
      <p class="mt-2 text-xs text-center text-gray-600 dark:text-gray-300">
        Version {{ $version }}
      </p>
    </div>
  
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow dark:bg-gray-700 sm:rounded-lg sm:px-10">

        @if(isset($hasErrors) && $hasErrors == true)
          <div class="prose dark:text-gray-400">
            <p>There were errors in your form</p>
            <ul class="text-red-600">
              @foreach($errors as $error)
                <li>
                  {{ $error }}
                </li>
              @endforeach
            </ul>
          </div>
        @endif

        <form class="space-y-6" action="/" method="POST">
          <div>
            <label for="host" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Host
            </label>
            <div class="mt-1">
              <input id="host" name="host" type="text" required class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" value="{{ config('redis.default-host') }}" autofocus>
            </div>
          </div>

          <div>
            <label for="port" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Port
            </label>
            <div class="mt-1">
              <input id="port" name="port" type="text" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" value="{{ config('redis.default-port') }}">
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Sign in
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
@endsection
