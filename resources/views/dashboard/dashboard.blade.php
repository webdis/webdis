@extends('layouts.dashboard')

@section('title', 'Dashboard')

@section('content')
<div>
    <dl class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
      <div class="px-4 py-5 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-900 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate dark:text-gray-300">
          Total Keys
        </dt>
        <dd class="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-50">
          {{ count($runner->run(['KEYS', '*'])) }}
        </dd>
      </div>
  
      <div class="px-4 py-5 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-900 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate dark:text-gray-300">
          Server Address
        </dt>
        <dd class="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-50">
          tcp://{{ $connection->host }}:{{ $connection->port }}
        </dd>
      </div>
  
      <div class="px-4 py-5 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-900 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate dark:text-gray-300">
          Total Namespaced Items
        </dt>
        <dd class="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            @php
                $namespaceOne = $client->keys('*_*');
                $namespaceTwo = $client->keys('*:*');
                $namespaceCount = count($namespaceOne) + count($namespaceTwo);    
            @endphp
            {{ $namespaceCount }}
        </dd>
      </div>
    </dl>
  </div>

<div class="flex flex-col my-4">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div class="overflow-hidden border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray:900">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Key
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Value
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Type
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Options</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-800 dark:bg-gray-600">
            @foreach($client->keys('*') as $key)
            @php
              if(config('redis.client') == 'predis')
              {
                $type = $client->type($key);
              }
              else
              {
                if(extension_loaded('redis'))
                {
                  $getFromRedis = $client->type($key);
                  $type = match($getFromRedis){
                    \Redis::REDIS_STRING => 'string',
                    \Redis::REDIS_SET => 'set',
                    \Redis::REDIS_LIST => 'list',
                    \Redis::REDIS_ZSET => 'zset',
                    \Redis::REDIS_HASH => 'hash',
                    default => 'Unknown'
                  };
                }
              }
            @endphp
            @if($type == 'string')
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50 whitespace-nowrap">
                  {{ $key }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {{ $client->get($key) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  String
                </td>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <a href="/view?key={{ $key }}" class="pr-2 text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-900">View</a>
                  <a href="#" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400">Edit</a>
                </td>
              </tr>
              @elseif($type == 'set')
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50 whitespace-nowrap">
                  {{ $key }}
                </td>
                <td class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  Has {{ $client->scard($key) }} Items
                </td>

                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  Set
                </td>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <a href="/view?key={{ $key }}" class="pr-2 text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-900">View</a>
                  <a href="#" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400">Edit</a>
                </td>
              </tr>
              @elseif($type == 'zset')
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50 whitespace-nowrap">
                  {{ $key }}
                </td>
                <td class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  Has {{ $client->zcard($key) }} Items
                </td>
                
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  Sorted Set
                </td>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <a href="#" class="pr-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400">View</a>
                  <a href="#" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400">Edit</a>
                </td>
              </tr>
              @else
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50 whitespace-nowrap">
                  {{ $key }}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  Unsupported Type
                </td>
                
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {{ ucfirst($type) }}
                </td>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <a href="#" class="pr-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400">View</a>
                  <a href="#" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400">Edit</a>
                </tr>
              @endif
            @endforeach

            <!-- More people... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  
@endsection