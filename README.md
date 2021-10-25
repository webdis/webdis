# Webdis

The Redis Administration Web App

This project is not dead, I'm just working on a lot of stuff at the same time. Thanks for your patience.

## About

Webdis is a Redis Admin Web App, inspired by PHPMyAdmin. The idea came from wanting to be able to have a simpler interface for accessing Redis, instead of using redis-cli.

If you would like to view the Documentation for Webdis, it is available [here](https://elijahcruz12.gitbook.io/webdis-documentation/).

## PLEASE NOTE WEBDIS IS NOT YET READY FOR PRODUCTION

Meanwhile Webdis is not ready for production, it is still possbible to run it without any issues.

## Currently Supported Groups

- String (partial)
- Set (partial)
- Sorted Set (partial)

## Unsupported Redis Features

- Logging in with both username/password is not yet supported.
- Logging into clusters is not yet supported.
- Cluster Management
- Changing Redis Configuration

## Roadmap

The roadmap for Webdis will be available in our documentation.

## Development

If you want to help in the development of Webdis, I first recommend you look over the code and run it in a web browser to see how it works.

Webdis' in general take multiple ideas from Laravel, Symfony, and more, in order to create it's own custom internal framework. Webdis utilizes controllers in the same way controllers are in Laravel, with some differences. Webdis even uses blade from Laravel to provide a unique
