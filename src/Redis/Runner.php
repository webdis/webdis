<?php

namespace Webdis\Redis;

use Predis\Client;
use Webdis\Redis\Exceptions\IncorrectArgumentType;
use Webdis\Redis\Exceptions\ToManyArgumentsException;

class Runner {

    private Client $client;

    private bool $error = false;

    private array $errors = [];

    private string $errorFromCommand = '';
    
    /**
     * Run a redis command simply and easily through here. 
     * 
     * @param Client $client
     * @param array|string $args
     * @return mixed
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * Run a command. Any command
     * that has been setup already will be ran. If command not ready, will
     * return false;
     * 
     * @param array $args
     * @return mixed
     */
    public function run(array|string $args) : mixed
    {

        if(!is_array($args)){
            $args = explode(' ', $args);
        }

        $command = strtoupper($args[0]);

        $exists = match ($command) {
            'GET', 'SET', 'KEYS' => true,
            default => false,
        };

        if($exists == false)
        {
            return false;
        }

        $method = $this->getMethod($command);

        if($method === 'nomethod'){
            return false;
        }

        $result = $this->{$command}($args);

        return $result;
    }

    /**
     * Allows us to figure out what 
     * 
     */
    private function getMethod(string $command) : string
    {
        $method = match ($command) {
            'KEYS' => 'keys',
            'GET' => 'get',
            'SET' => 'set',
            default => 'nomethod'
        };

        return $method;
    }

    /**
     * Returns if there is an error or not.
     * 
     * @return bool
     */
    private function hasErrors() : bool
    {
        return $this->error;
    }

    /**
     * Returns the error bag.
     * 
     * @return $array
     */
    public function getErrors() : array
    {
        return $this->errors;
    }

    /**
     * Returns the command that caused an error
     * 
     * @return string
     */
    public function errorCameFrom() : string
    {
        return $this->errorFromCommand;
    }

    private function keys(array $args) : array
    {
        $argsCountCheck = count($args);

        if($argsCountCheck != 2){
            $argsCountCheckCount = $argsCountCheck - 1;
            throw new ToManyArgumentsException('KEYS expecs one argument, got '.$argsCountCheckCount.'.');
        }

        if(!is_string($args[1]))
        {
            throw new IncorrectArgumentType('KEYS expect argument to be string, got '.gettype($args).'.');
        }

        return $this->client->keys($args[1]);
    }
}