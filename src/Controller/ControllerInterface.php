<?php

namespace Webdis\Controller;

interface ControllerInterface
{
    public function response(string $content, int $status = 200, array $headers = []) : Response;
}