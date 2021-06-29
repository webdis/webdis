<?php

namespace Webdis\Console\Cache;

use Dotenv\Dotenv;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Webdis\Cache\CacheConfig as CacheCacheConfig;
use Webdis\Config\Config;

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

        $envLoad = Dotenv::createImmutable(dirname(__DIR__, 3));

        $envLoad->load();

        $cacheconfig = new CacheCacheConfig(dirname(__DIR__, 3) . '/config', dirname(__DIR__, 3) . '/storage/cache');
        
        $cacheconfig->deleteCache();
        
        $config = new Config(dirname(__DIR__, 3));

        Config::store($config->config, $config->from);

        $output->writeln('Note if your config was already cached it will remove the old file and make a new one.');

        $cacheconfig->cache();

        $output->writeln('<fg=green>Config Cached!<fg=white>');

        return COMMAND::SUCCESS;
    }
}