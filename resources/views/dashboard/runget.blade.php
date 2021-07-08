@extends('layouts.dashboard')

@section('title', 'Run a Command')

@section('content')

<div class="max-w-7xl mx-auto">
<div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
    <div class="px-4 py-5 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Run a Comamnd
    </h3>
    <p class="mt-1 text-sm text-gray-500">
      Run a command below, or use the form in the navigation bar above.
    </p>
  
    </div>
    <div class="px-4 py-5 sm:p-6">

        <form action="/run" method="POST">
            <label for="command" class="block text-sm font-medium text-gray-700">Command</label>
            <div class="mt-1">
            <input type="text" name="command" id="command" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Run your command here..." required>
            </div>
        </div>
        
            </div>
        </form>
  
</div>

@endsection