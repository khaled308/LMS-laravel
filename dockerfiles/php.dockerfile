FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libgd-dev \
    jpegoptim optipng pngquant gifsicle \
    libonig-dev \
    libxml2-dev \
    zip \
    sudo \
    unzip

RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

WORKDIR /var/www/html

RUN addgroup --gid 1000 laravel && \
    adduser --disabled-password --gecos '' --uid 1000 --ingroup laravel laravel

RUN chown -R laravel:laravel /var/www/html

USER laravel

CMD ["php-fpm"]

EXPOSE 9000
