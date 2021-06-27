<?php

namespace Webdis\Cache;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

class CacheConfig
{
    private Finder $configFiles;

    private string $cacheFolder;

    public function __construct(string $folder, string $cacheFolder)
    {
        $finder = new Finder();

        $this->configFiles = $finder->files()->name('*.php')->in($folder);

        $this->cacheFolder = $cacheFolder;
    }

    public function cache()
    {
        $fileStart = 
        "<?php 
        
        return ";

        $configArray = [];

        $count = 0;

        foreach($this->configFiles as $file)
        {
            $fileArray = include $file->getRealPath();

            $fileArrayWithName[$file->getBasename('.php')] = $fileArray;

            $count = array_push($configArray, $fileArrayWithName);
        }

        $filesystem = new Filesystem();

        if($filesystem->exists($this->cacheFolder . '/config.php'))
        {
            $filesystem->remove($this->cacheFolder . '/config.php');
        }

        $arrayString = var_export($configArray[$count - 1], true);

        $arrayString = str_replace('array (', '[', $arrayString);
        $arrayString = str_replace(')', ']', $arrayString);

        $filesystem->touch($this->cacheFolder . '/config.php');

        $filesystem->dumpFile($this->cacheFolder . '/config.php', $fileStart . $arrayString . ';');

        return true;
    }

}