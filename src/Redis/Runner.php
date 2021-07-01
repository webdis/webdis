<?php

namespace Webdis\Redis;

use Predis\Client;
use Webdis\Constant;
use Webdis\Redis\Exceptions\IncorrectArgumentType;
use Webdis\Redis\Exceptions\ToManyArgumentsException;

class Runner {

    private $client;

    private bool $error = false;

    private array $errors = [];

    private string $errorFromCommand = '';

    private array $lastRowsReturned = ['amountReturned' => 0, 'affected' => 0];
    
    /**
     * Run a redis command simply and easily through here. 
     * 
     * @param $client
     * @param array|string $args
     * @return mixed
     */
    public function __construct($client)
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

        $method = $this->getMethod($command);
        
        $result = $this->{$method}($args);

        return $result;
    }

    /**
     * Gets the command's method that we have created.
     *
     * @param string $command
     * @return string
     */
    private function getMethod(string $command) : string
    {
        $method = match ($command) {
            'KEYS' => 'keys',
            'DEL' => 'del',
            'GET' => 'get',
            'SET' => 'set',
            'INCR' => 'incr',
            'DECR' => 'decr',
            'INCRBY' => 'incrby',
            'DECRBY' => 'decrby',
            'GETRANGE' => 'getrange',
            'GETSET' => 'getset',
            'SADD'=> 'sadd',
            'GETDEL' => 'getdel',
            'APPEND' => 'append',
            'FLUSHALL' => 'flushall',
            // 'incompatible' => 'incompatible',
            default => 'nomethod'
        };

        return $method;
    }

    /**
     * Checks if the client can handle the current command.
     *
     * @param string $command
     * @param string $client
     * @return boolean
     */
    private function compatible(string $command, string $client = 'predis') : bool
    {
        if($client == 'predis')
        {
            $compatible = match($command)
            {
                'KEYS', 'DEL', 'SET', 'INCR', 'DECR', 'GETRANGE', 'SADD', 'GET', 'GETDEL', 'APPEND', 'FLUSHALL' => true,
                default => false
            };
        }
        else
        {
            $compatible = match($command)
            {
                'KEYS', 'DEL', 'SET', 'INCR', 'DECR', 'GETRANGE', 'SADD', 'GET', 'GETDEL', 'APPEND', 'FLUSHALL' => true,
                default => false
            };
        }

        return $compatible;
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
     * @return string[]
     */
    public function errorCameFrom() : string
    {
        return $this->errorFromCommand;
    }

    public function lastRows(): array
    {
        return $this->lastRowsReturned;
    }

    /**
     * These are the KEYS group
     */

    /**
     * Returns all the selected KEYS.
     *
     * @param array $args
     * @return array
     */
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

        $this->lastRowsReturned['amountReturned'] = count($this->client->keys($args[1]));

        $this->lastRowsReturned['actionType'] = "Returned";

        $this->lastRowsReturned['affected'] = 0;

        return $this->client->keys($args[1]);
    }

    /**
     * Deleted the selected KEY.
     *
     * @param array $args
     * @return string
     */
    private function del(array $args) : string
    {
        $argsCountCheck = count($args);

        if($argsCountCheck != 2){
            $argsCountCheckCount = $argsCountCheck - 1;
            throw new ToManyArgumentsException('DEL expecs one argument, got '.$argsCountCheckCount.'.');
        }

        $this->lastRowsReturned['amountReturned'] = count($this->client->keys($args[1]));

        $this->lastRowsReturned['actionType'] = "Returned";

        $this->lastRowsReturned['affected'] = 0;

        $this->client->del($args[1]);

        return 'Deleted key: ' . $args[1];
    }

    private function flushall(array $args) : string
    {
        if(!'app.demo'){
        $this->lastRowsReturned['amountReturned'] = count($this->client->keys("*"));

        $this->lastRowsReturned['actionType'] = "Deleted";

        $this->lastRowsReturned['affected'] = "ALL";

        $this->client->flushAll();

        return 'DELETED ALL KEYS.';
        }
        else {
            $this->lastRowsReturned['amountReturned'] = 0;

            $this->lastRowsReturned['actionType'] = "Deleted";

            $this->lastRowsReturned['affected'] = 0;

            return 'Demo Mode activated. Cannot delete all keys. But, you can delete individually';
        }
    }

    /**
     * These are the STRING group commands.
     */

    private function get(array $args)
    {
        $argsCountCheck = count($args);

        if($argsCountCheck != 2){
            $argsCountCheckCount = $argsCountCheck - 1;
            throw new ToManyArgumentsException('GET expecs one argument, got '.$argsCountCheckCount.'.');
        }

        if(!is_string($args[1]))
        {
            throw new IncorrectArgumentType('GET expect argument to be string, got '.gettype($args).'.');
        }

        $key = str_replace('"', "", str_replace("'", "", $args[1]));

        if($this->client->get($key) != null)
        {
            $this->lastRowsReturned['amountReturned'] = 1;
        }
        else
        {
            $this->lastRowsReturned['amountReturned'] = 0;
        }

        $this->lastRowsReturned['actionType'] = "Returned";

        

        $this->lastRowsReturned['affected'] = 0;

        return $this->client->get($key);
    }

    private function set(array $args)
    {
        $name = $args[1];

        unset($args[1]);
        unset($args[0]);

        $this->lastRowsReturned['amountReturned'] = 1;

        $this->lastRowsReturned['affected'] = 0;

        $this->lastRowsReturned['actionType'] = "Created";

        $array = implode(' ', $args);

        $value = str_replace('"', "", str_replace("'", "", $array));

        return $this->client->set($name, $value);
    }

    private function append(array $args)
    {
        $name = $args[1];

        unset($args[1]);
        unset($args[0]);

        $this->lastRowsReturned['amountReturned'] = 1;

        $this->lastRowsReturned['affected'] = 1;

        $this->lastRowsReturned['actionType'] = "Appended";
        
        $array = implode(' ', $args);
        
        $value = str_replace('"', "", str_replace("'", "", $array));

        return $this->client->append($name, $value);
    }

    private function getdel(array $args)
    {
        $argsCountCheck = count($args);

        if($argsCountCheck != 2){
            $argsCountCheckCount = $argsCountCheck - 1;
            throw new ToManyArgumentsException('GET expecs one argument, got '.$argsCountCheckCount.'.');
        }

        if(!is_string($args[1]))
        {
            throw new IncorrectArgumentType('GET expect argument to be string, got '.gettype($args).'.');
        }

        $key = str_replace('"', "", str_replace("'", "", $args[1]));

        if($this->client->get($key) != null)
        {
            $this->lastRowsReturned['amountReturned'] = 1;
        }
        else
        {
            $this->lastRowsReturned['amountReturned'] = 0;
        }

        $this->lastRowsReturned['actionType'] = "Returned Then Deleted";

        

        $this->lastRowsReturned['affected'] = 0;

        $value = $this->client->get($key);

        $this->client->del($key);

        return $value;
    }

    private function getrange(array $args)
    {
        $key = str_replace('"', "", str_replace("'", "", $args[1]));

        if($this->client->get($key) != null)
        {
            $this->lastRowsReturned['amountReturned'] = 1;
        }
        else
        {
            $this->lastRowsReturned['amountReturned'] = 0;
        }

        $this->lastRowsReturned['actionType'] = "Returned";

        

        $this->lastRowsReturned['affected'] = 0;

        return $this->client->getRange($key, $args[2], $args[3]);
    }

    private function getset(array $args)
    {
        $name = $args[1];

        unset($args[1]);
        unset($args[0]);

        $this->lastRowsReturned['amountReturned'] = 1;

        $this->lastRowsReturned['affected'] = 0;

        $this->lastRowsReturned['actionType'] = "Created";

        $array = implode(' ', $args);

        $value = str_replace('"', "", str_replace("'", "", $array));

        $value = $this->client->getSet($name, $value);

        return $value;
    }

    private function incr(array $args)
    {
        $argsCountCheck = count($args);

        $key = str_replace('"', "", str_replace("'", "", $args[1]));

        if($this->client->get($key) != null)
        {
            $this->lastRowsReturned['amountReturned'] = 1;
        }
        else
        {
            $this->lastRowsReturned['amountReturned'] = 0;
        }

        $this->lastRowsReturned['actionType'] = "Returned";

        

        $this->lastRowsReturned['affected'] = 0;

        $this->client->incr($key);

        return $this->client->get($key);
    }

    private function decr(array $args)
    {
        $argsCountCheck = count($args);

        $key = str_replace('"', "", str_replace("'", "", $args[1]));

        if($this->client->get($key) != null)
        {
            $this->lastRowsReturned['amountReturned'] = 1;
        }
        else
        {
            $this->lastRowsReturned['amountReturned'] = 0;
        }

        $this->lastRowsReturned['actionType'] = "Returned";

        

        $this->lastRowsReturned['affected'] = 0;

        $this->client->decr($key);

        return $this->client->get($key);
    }

    /**
     * These are the Set Commands.
     */

    private function sadd(array $args) : string
    {
        $name = $args[1];

        unset($args[1]);
        unset($args[0]);

        $created = 0;
        foreach($args as $value)
        {
            $this->client->sAdd($name, $value);
            $created++;
        }

        // call_user_func_array(array($this->client, "sadd"), $args);

        $this->lastRowsReturned['amountReturned'] = $created;

        $this->lastRowsReturned['affected'] = $created;

        $this->lastRowsReturned['actionType'] = "Created";

        $result = 'Successfully added: ';

        $items = $created;

        foreach($args as $value)
        {
            if($items == 1){
                $result = $result . 'and ' . $value . ' to the set: ' . $name;
            }
            else{
                $result = $result . $value . ', ';
            }

            $items = $items - 1;

        }

        return $result;
    }

    private function nomethod(array $args)
    {
        $this->lastRowsReturned['amountReturned'] = 0;

        $this->lastRowsReturned['affected'] = 0;

        $this->lastRowsReturned['actionType'] = "Affected";

        return "The command " . strtoupper($args[0]) . " either does not exist or is not yet available in Webdis Version " . Constant::VERSION;
    }
}