<?php

namespace Webdis\Console\Cache;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Webdis\Cache\CacheConfig as CacheCacheConfig;

class CacheConfig extends Command
{
    protected static $defaultName="cache:config";

    protected function configure() : void
    {
        $this->setDescription('Cache\'s your configuration files.')
            ->setHelp('Allows you to cache your config files, which speed up your website');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('Caching your configs.');

        $output->writeln('Note if your config was already cached it will remove the old file and make a new one.');

        $cacheconfig = new CacheCacheConfig(dirname(__DIR__, 3) . '/config', dirname(__DIR__, 3) . '/storage/cache');

        $cacheconfig->cache();

        $output->writeln('<fg=green>Config Cached!<fg=white>');

        return COMMAND::SUCCESS;
    }
}