<?php

namespace Webdis\Cache;

use Exception;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

class DevCache
{
    private string $root;

    private string $viewCache;

    public function __construct(string $root, string $viewCache)
    {
        $this->root = $root;

        $this->viewCache = $viewCache;
    }

    public function deleteViewCache() : bool
    {

       $finder = new Finder();

       $files = $finder->files()->in($this->viewCache)->name('*.php');

       $filesystem = new Filesystem();

       foreach($files as $file){
           $filesystem->remove($file->getPathName());

           if($filesystem->exists($file->getPathname()))
           {
               throw new Exception('File ' , $file->getPathname() . 'Was not successfully deleted');

               return false;
           }

        }

        return true;

    }
}