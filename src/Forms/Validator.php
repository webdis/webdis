<?php

namespace Webdis\Forms;

class Validator
{
    public bool $is_valid = true;

    private array $request = [];

    public array $errors = [];

    public function validate(array $postData = [], $definition = [])
    {
        $this->request = $postData;

        foreach($definition as $key => $value)
        {
            $itemBeingChecked = $key;
            foreach($value as $validator)
            {
                $this->{$validator}($key);
            }
        }
    }

    private function required($key) : void
    {
        if($this->request[$key] == null || $this->request[$key] == '' | !isset($this->request[$key])){
            $this->is_valid = false;

            $arrayForError = [
                $key => 'The field ' . $key . ' is required.'
            ];

            $this->errors += $arrayForError;
        }
    }

    public function boolean($key) : void
    {
        if(!is_bool($this->request[$key])){
            $arrayForError = [
                $key => 'The field ' . $key . ' is must be true/false, 1/0, or yes/no.'
            ];

            $this->errors += $arrayForError;
        }
    }
}