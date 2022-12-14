FROM php:8.1.10-fpm

ARG USER
ARG UID

COPY php.ini-production .

RUN mv "php.ini-production" "$PHP_INI_DIR/php.ini"

RUN apt-get update && apt-get install -y \
    build-essential \
    zip \
    git \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    libxml2-dev \
    tzdata

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions mbstring

RUN docker-php-ext-install mysqli pdo pdo_mysql gd zip xml simplexml dom xmlwriter fileinfo

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -G www-data,root -u $UID -d /home/$USER $USER
RUN mkdir -p /home/$USER/.composer && \
    chown -R $USER:$USER /home/$USER

WORKDIR /var/www/laravel

USER $USER

COPY . .

EXPOSE 9000

CMD bash -c "composer install && php artisan migrate && docker-php-entrypoint php-fpm"
