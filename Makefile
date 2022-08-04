DOCKERHUB_REPO := $(shell cat ./docker_repo.var)
DOCKER_TAG ?= $(shell git rev-parse --short HEAD)
DOCKER_IMAGE := $(DOCKERHUB_REPO):$(DOCKER_TAG)
DOCKER_IMAGE_LATEST := $(DOCKERHUB_REPO):latest
DOCKER_COMPOSE_PATH := ./docker-compose.yml
DOCKERFILE_PATH := ./Dockerfile
DOCKER_IMAGE_BRANCH := $(DOCKERHUB_REPO):$(shell git describe --exact-match --tags 2> /dev/null || git symbolic-ref --short HEAD)
# `DOCKER_IMAGE_BRANCH` tag is the git tag for the commit if it exists,
# else the branch on which the commit exists.


.PHONY: build
build:
	docker-compose -f $(DOCKER_COMPOSE_PATH) build

.PHONY: build-full
build-full:
	docker build -t $(DOCKER_IMAGE) -f ./Dockerfile .

.PHONY: info
info:
	@echo $(DOCKERHUB_REPO)
	@echo $(DOCKER_TAG)
	@echo $(DOCKER_IMAGE)
	@echo $(DOCKER_IMAGE_LATEST)
	@echo $(DOCKER_IMAGE_BRANCH)

.PHONY: publish
publish:
	docker push $(DOCKER_IMAGE)

.PHONY: publish-latest
publish-latest:
	docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_LATEST)
	docker push $(DOCKER_IMAGE_LATEST)

.PHONY: start
start:
	docker-compose -f $(DOCKER_COMPOSE_PATH) up &

.PHONY: stop
stop:
	docker-compose -f $(DOCKER_COMPOSE_PATH) down
