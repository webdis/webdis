@extends('layouts.dashboard')

@section('title', 'Running: "' . $command . '"')

@section('content')

<div class="mx-auto mb-2 max-w-7xl md:mb-3">
    <div class="overflow-hidden bg-white rounded-lg shadow">
        <div class="px-4 py-5 sm:p-6">
            <div class="flex w-full gap-x-4">
                <div class="flex-1 text-2xl font-semibold truncate md:text-3xl">
                    Running: {{$command}}
                </div>
                <div class="text-xl text-right md:text-2xl">
                    @if($commandDoes == "return")
                        Returned <span class="font-semibold">{{ $lastRows['amountReturned'] }}</span> Keys
                    @elseif($commandDoes = "create")
                        Created <span class="font-semobold">{{ $lastRows['amountReturned'] }} Key(s)
                    @endif
                </div>
            </div>
        </div>
    </div>  
</div>

<div class="mx-auto max-w-7xl">
    @if($type == 'array')
        <ul class="space-y-3">
            @foreach($result as $result)
            <li class="px-6 py-4 overflow-hidden text-xl bg-white rounded-md shadow md:text-2xl">
                {{ $result }}
            </li>
            @endforeach
        </ul>
    @elseif($type == 'string')
    <div class="overflow-hidden bg-white rounded-lg shadow">
        <div class="px-4 py-5 sm:p-6">
            {{ $result }}
        </div>
    </div>
  
    @endif
</div>

    
@endsection