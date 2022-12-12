SHELL := /usr/bin/env bash
CURR_UID ?= $(shell id -u)

# ******************************* #
#  Control Commands               #
# ******************************* #

setup: build-no-cache

build-no-cache: build-nginx-no-cache build-laravel-no-cache

build-laravel:
	@echo "Building Travel Wellness Project - Laravel..."
	@docker build -f Dockerfile --build-arg USER=$$USER --build-arg UID=$(CURR_UID) -t twellness/laravel:latest .
	@echo "...Done!"

build-laravel-no-cache:
	@echo "Building Travel Wellness Project - Laravel... (--no-cache)"
	@docker build -f Dockerfile --build-arg USER=$$USER --build-arg UID=$(CURR_UID) -t twellness/laravel:latest . --no-cache
	@echo "...Done!"

build-nginx-no-cache:
	@echo "Building Travel Wellness Project - Custom NGINX... (--no-cache)"
	@docker build -t twellness/nginx:latest nginx --no-cache
	@echo "...Done!"

start:
	@echo "Booting up Travel Wellness Project Services [Local Development]..."
	@docker network create twellness-network || true
	@docker-compose up --force-recreate --renew-anon-volumes

down:
	@echo "Cleaning up Travel Wellness Project Services [Local Development]..."
	@docker-compose down

clean: down

restart: clean start

laravel-bash:
	@echo "Connecting to laravel container"
	@docker-compose exec laravel bash
