<?php

namespace Webdis\Redis;

use Predis\Client;

trait Run {
    
    /**
     * Run a redis command simply and easily through here. Any command
     * that has been setup already will be ran. If command not ready, will
     * return false;
     * 
     * @param Client $client
     * @param array|string $args
     * @return mixed
     */
    public function run(Client $client, array|string $args) : mixed
    {
        if(!is_array($args)){
            $args = explode(' ', $args);
        }

        $command = strtoupper(array_key_first($args));

        $exists = match ($command) {
            'GET', 'SET', 'KEYS' => true,
            default => false,
        };

        if($exists == false)
        {
            return false;
        }


    }
}