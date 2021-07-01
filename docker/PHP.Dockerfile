FROM php:8.0-fpm

RUN docker-php-ext-install pdo

RUN pecl install -o -f redis \
&&  rm -rf /tmp/pear \
&&  docker-php-ext-enable redis