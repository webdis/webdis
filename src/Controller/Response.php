<?php

namespace Webdis\Controller;

class Response
{
    public string $content;

    public int $status;

    public array $headers;

    public function __construct(string $content, int $status_code = 200, array $headers = []){
        $this->content = $content;

        $this->status = $status_code;

        $this->headers = $headers;
    }
}