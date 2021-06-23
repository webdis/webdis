<?php

namespace Webdis\Controller;

class Controller implements ControllerInterface
{
    public function response(string $content, int $status = 200, array $headers = []): Response
    {
        return new Response($content, $status, $headers);
    }
}