@extends('layouts.dashboard')

@section('title', 'Viewing ' . ucfirst($type) . ' ' . $key)

@section('content')
        <div class="max-w-6xl px-2 mx-auto md:px-0">
            <div class="overflow-hidden bg-white rounded-lg shadow dark:bg-gray-900">
                <div class="p-6 bg-white dark:bg-gray-900">
                    <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="sm:flex sm:space-x-5">
                        <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p class="text-xl font-bold text-gray-900 dark:text-gray-50 sm:text-2xl">Viewing: {{ $key }}</p>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{{ ucfirst( $type ) }}</p>
                        </div>
                    </div>
                    <div class="flex justify-center gap-2 mt-5 sm:mt-0">
                        <a href="#" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900">
                        Edit
                        </a>

                        <a href="#" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-100 bg-red-600 border border-gray-300 rounded-md shadow-sm hover:bg-red-700 dark:border-gray-700">
                        Delete
                        </a>
                    </div>
                    </div>
                </div>
            </div>
  
            <div class="mt-2 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-900 md:mt-4">
                <div class="px-4 py-5 text-xl font-semibold dark:text-gray-100 sm:px-6 md:text-2xl">
                 Result
                </div>
                <div class="px-4 py-5 sm:p-6">
                    @if($type == 'string')
                        <p class="dark:text-gray-300">{{ $value }}</p>
                    @elseif($type == 'set')
                        <ul class="divide-y divide-gray-200 dark:divide-gray-800">
                        @foreach($value as $setValue)
                            <li class="flex py-4">
                                <p class="dark:text-gray-300">{{ $setValue }}</p>
                            </li>
                        @endforeach
                        </ul>
                    @endif
                </div>
            </div>
  

        </div>
@endsection