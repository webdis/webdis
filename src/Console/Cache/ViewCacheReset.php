<?php

namespace Webdis\Console\Cache;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

class ViewCacheReset extends Command
{
    protected static $defaultName = "view:reset";

    protected function configure()
    {
        $this->setDescription('Resets your view cache');

    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('Deleting view cache');

        $finder = new Finder();

       $files = $finder->files()->in(dirname(__DIR__, 3) . '/storage/cache/views')->name('*.php');

       $filesystem = new Filesystem();

       foreach($files as $file){
           $filesystem->remove($file->getPathName());

           if($filesystem->exists($file->getPathname()))
           {
               $output->writeln('File ' , $file->getPathname() . 'Was not successfully deleted');

               return Command::FAILURE;
           }

        }

        $output->writeln('<fg=green>View Cache Successfully deleted<fg=white>');

        return Command::SUCCESS;
    }
}