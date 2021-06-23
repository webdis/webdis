<?php

namespace Webdis\Config;

use League\Flysystem\Filesystem;
use League\Flysystem\FilesystemException;
use League\Flysystem\Local\LocalFilesystemAdapter;
use League\Flysystem\UnableToRetrieveMetadata;
use Whoops\Run;

class ConfigLoader implements \Serializable
{
    public string $name = '';

    public array $config = [];

    public function __construct(string $name = '', string $file = '')
    {
        $this->name = $name;

        $filesystemAdapter = new LocalFilesystemAdapter(dirname(__DIR__, 2));
        $filesystem = new Filesystem($filesystemAdapter);

        try{
            $fileExists = $filesystem->fileExists($file);
        } catch (FilesystemException | UnableToRetrieveMetadata $exception) {
            throw new FilesystemException($exception);
        }
    }

    public function serialize()
    {
        
    }

    public function unserialize($data)
    {
        
    }
}