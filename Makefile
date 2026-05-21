#!make

### ENV VARS ###########

DOCKERHUB_REPO := taccwma/colormovestacc
DOCKER_TAG ?= $(shell git rev-parse --short HEAD)
DOCKER_IMAGE := $(DOCKERHUB_REPO):$(DOCKER_TAG)
DOCKER_IMAGE_LATEST := $(DOCKERHUB_REPO):latest
# Note: DOCKER_IMAGE_BRANCH is the git tag for the commit,
# if it exists, else it is the branch on which the commit exists
DOCKER_IMAGE_BRANCH := $(DOCKERHUB_REPO):$(shell git describe --exact-match --tags 2> /dev/null || git symbolic-ref --short HEAD)

ifndef DOCKER_COMPOSE_COMMAND
override DOCKER_COMPOSE_COMMAND := docker compose
endif

### BUILD  ###########

# Build the colormoves app image from source using docker compose.
.PHONY: build
build:
	${DOCKER_COMPOSE_COMMAND} -f docker-compose.yml build

# Build the colormoves app image from source using docker engine.
.PHONY: build-image
build-image:
	docker build -t $(DOCKER_IMAGE) -f ./Dockerfile .

### INFO  ###########

# Display info about the current setup.
.PHONY: info
info: info-env info-colormoves

# Display information about the current env vars used by Make.
.PHONY: info-env
info-env:
	@echo "Environment:"
	@printf "\n"
	@echo "DOCKERHUB_REPO: $(DOCKERHUB_REPO)"
	@echo "DOCKER_TAG: $(DOCKER_TAG)"
	@echo "DOCKER_IMAGE: $(DOCKER_IMAGE)"
	@echo "DOCKER_IMAGE_LATEST: $(DOCKER_IMAGE_LATEST)"
	@echo "DOCKER_IMAGE_BRANCH: $(DOCKER_IMAGE_BRANCH)"
	@echo "DOCKER_COMPOSE_COMMAND: $(DOCKER_COMPOSE_COMMAND) ..."
	@printf "\n\n"

# Display the running container information.
.PHONY: info-colormoves
info-colormoves:
	@echo "Colormoves container configuration:"
	@printf "\n"
	docker inspect colormoves
	@printf "\n\n"

### PUBLISH  ###########

# Publish the current image tag to docker hub.
.PHONY: publish
publish: publish-latest
	docker push $(DOCKER_IMAGE)

# Tag and publish latest image to docker hub.
.PHONY: publish-latest
publish-latest: tag-image
	docker push $(DOCKER_IMAGE_LATEST)

# Tag the latest colormoves app  image file.
.PHONY: tag-image
tag-image:
	docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_LATEST)

### UTILS  ###########

# Open a browser window for the application.
.PHONY: open-browser
open-browser:
	open "http://localhost:8888" &

### START  ###########

# Start the app (used in automated deployments).
.PHONY: start
start:
	${DOCKER_COMPOSE_COMMAND} -f docker-compose.yml up &

# Start the app using a published image and open a browser.
.PHONY: start-app
start-app: open-browser start-image
	@echo "Starting Colormoves using latest image..."

# Start the app using source code and open a browser window.
.PHONY: start-dev
start-dev: open-browser start
	@echo "Starting Colormoves using local source..."

# Start the app using an image.
.PHONY: start-image
start-image:
	docker run --name colormoves -p 8888:8888 taccwma/colormovestacc:latest

### STOP  ###########

# Start the app (used in automated deployments).
.PHONY: stop
stop:
	${DOCKER_COMPOSE_COMMAND} -f docker-compose.yml down

# Stop the app running a published image.
.PHONY: stop-app
stop-app: stop-image
	@echo "Colormoves is shutting down."

# Stop the app running source.
.PHONY: stop-dev
stop-dev: stop
	@echo "Colormoves is shutting down."

# Stop the app running an image.
.PHONY: stop-image
stop-image:
	docker kill colormoves
	docker rm colormoves
