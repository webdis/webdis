@extends('layouts.minimal')

@section('title', 'Welcome')

@section('content')
<div class="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="w-auto h-12 mx-auto" src="@asset('img/webdis.svg')" alt="Webdis">
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm text-center text-gray-600">
        Or
        <a href="#" class="font-medium text-green-600 hover:text-green-500">
          start your 14-day free trial
        </a>
      </p>
    </div>
  
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="host" class="block text-sm font-medium text-gray-700">
              Host
            </label>
            <div class="mt-1">
              <input id="host" name="host" type="text" required class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" value="127.0.0.1">
            </div>
          </div>

          <div>
            <label for="port" class="block text-sm font-medium text-gray-700">
              Port
            </label>
            <div class="mt-1">
              <input id="port" name="port" type="text" required class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" value="6379">
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
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