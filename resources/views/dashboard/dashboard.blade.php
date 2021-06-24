@extends('layouts.dashboard')

@section('title', 'Dashboard')

@section('content')
<div>
    <dl class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
      <div class="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Keys
        </dt>
        <dd class="mt-1 text-2xl font-semibold text-gray-900">
          {{ count($client->keys('*')) }}
        </dd>
      </div>
  
      <div class="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Server Address
        </dt>
        <dd class="mt-1 text-2xl font-semibold text-gray-900">
          tcp://{{ $connection->host }}:{{ $connection->port }}
        </dd>
      </div>
  
      <div class="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Namespaces
        </dt>
        <dd class="mt-1 text-2xl font-semibold text-gray-900">
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
      <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Key
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Value
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Options</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @foreach($client->keys('*') as $key)
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {{ $key }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {{ $client->get($key) }}
                </td>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            @endforeach

            <!-- More people... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  
@endsection