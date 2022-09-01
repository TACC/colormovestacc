DOCKERHUB_REPO := $(shell cat ./docker_repo.var)
DOCKER_TAG ?= $(shell git rev-parse --short HEAD)
DOCKER_IMAGE := $(DOCKERHUB_REPO):$(DOCKER_TAG)
DOCKER_IMAGE_LATEST := $(DOCKERHUB_REPO):latest
DOCKER_COMPOSE_PATH := ./docker-compose.yml
DOCKERFILE_PATH := ./Dockerfile
DOCKER_IMAGE_BRANCH := $(DOCKERHUB_REPO):$(shell git describe --exact-match --tags 2> /dev/null || git symbolic-ref --short HEAD)
# `DOCKER_IMAGE_BRANCH` tag is the git tag for the commit if it exists,
# else the branch on which the commit exists.

# Build the colormoves app image from source using docker compose.
.PHONY: build
build:
	docker-compose -f $(DOCKER_COMPOSE_PATH) build

# Build the colormoves app image from source using docker engine.
.PHONY: build-full
build-full:
	docker build -t $(DOCKER_IMAGE) -f ./Dockerfile .

# Tag the latest colormoves app  image file.
.PHONY: tag-latest-image
tag-latest-image:
	docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_LATEST)

# Tag and publish latest image to docker hub.
.PHONY: publish-latest
publish-latest: tag-latest-image
	docker push $(DOCKER_IMAGE_LATEST)

# Publish the current image tag to docker hub.
.PHONY: publish
publish: publish-latest
	docker push $(DOCKER_IMAGE)

# Run the colormoves app if using docker-compose.
.PHONY: start-compose
start-compose:
	docker-compose -f $(DOCKER_COMPOSE_PATH) up &

# Run the colormoves app if using the latest image file.
.PHONY: start-image
start-image:
	docker run --name colormoves -p 8888:8888 taccwma/colormovestacc:latest &

# Start the app image as a container.
.PHONY: start
start: start-image open-browser
	@echo "Colormoves is now running..."

# Stop the colormoves app if using docker-compose.
.PHONY: stop-compose
stop-compose:
	docker-compose -f $(DOCKER_COMPOSE_PATH) down

# Stop the colormoves app if using the image file.
.PHONY: stop-image
stop-image:
	docker kill colormoves
	docker rm colormoves

# Stop the app image as a container.
.PHONY: stop
stop: stop-image
	@echo "Colormoves is shutting down."

# Display info about the current setup.
.PHONY: info
info: info-make info-colormoves
	@echo "-- Current Make & Docker Information"

# Display the running container information.
.PHONY: info-colormoves
info-colormoves:
	docker ps -a
	docker inspect colormoves

# Display information about the current env vars used by Make.
.PHONY: info-make
info-make:
	@echo $(DOCKERHUB_REPO)
	@echo $(DOCKER_TAG)
	@echo $(DOCKER_IMAGE)
	@echo $(DOCKER_IMAGE_LATEST)
	@echo $(DOCKER_IMAGE_BRANCH)

.PHONY: open-browser
open-browser:
	open http://0.0.0.0:8888
