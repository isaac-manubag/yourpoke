SHELL := /usr/bin/env bash
CURR_UID ?= $(shell id -u)

# ******************************* #
#  Control Commands               #
# ******************************* #

setup: build-no-cache

build-no-cache: build-nginx-no-cache build-laravel-no-cache

build-laravel:
	@echo "Building Your Poke Project - Laravel..."
	@docker build -f laravel/Dockerfile --build-arg USER=$$USER --build-arg UID=$(CURR_UID) -t yourpoke/laravel:latest laravel
	@echo "...Done!"

build-laravel-no-cache:
	@echo "Building Your Poke Project - Laravel... (--no-cache)"
	@docker build -f laravel/Dockerfile --build-arg USER=$$USER --build-arg UID=$(CURR_UID) -t yourpoke/laravel:latest laravel --no-cache
	@echo "...Done!"

build-nginx-no-cache:
	@echo "Building Your Poke Project - Custom NGINX... (--no-cache)"
	@docker build -t yourpoke/nginx:latest nginx --no-cache
	@echo "...Done!"


build-vue-no-cache:
	@echo "Building Your Poke Project - Vue Service [LOCAL]..."
	@docker build -f vue/Dockerfile -t yourpoke/vue:latest vue --no-cache

rebuild-vue:
	@echo "Rebuilding Your Poke Project - Vue Service..."
	@docker build -f vue/Dockerfile -t yourpoke/vue:latest vue

start:
	@echo "Booting up Your Poke Project Services [Local Development]..."
	@docker network create yourpoke-network || true
	@docker-compose up --force-recreate --renew-anon-volumes

down:
	@echo "Cleaning up Your Poke Project Services [Local Development]..."
	@docker-compose down

clean: down

restart: clean start

bash:
	@echo "Connecting to laravel container"
	@docker-compose exec laravel bash
