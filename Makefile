#############################
### ENV VARS ###########

DOCKERHUB_REPO := $(shell cat ./docker_repo.var)
DOCKER_TAG ?= $(shell git rev-parse --short HEAD)
DOCKER_IMAGE := $(DOCKERHUB_REPO):$(DOCKER_TAG)
DOCKER_IMAGE_LATEST := $(DOCKERHUB_REPO):latest
# DOCKER_IMAGE_BRANCH is the git tag for the commit (if it exists, else it is the branch on which the commit exists).
DOCKER_IMAGE_BRANCH := $(DOCKERHUB_REPO):$(shell git describe --exact-match --tags 2> /dev/null || git symbolic-ref --short HEAD)


#############################
### BUILD  ###########

# Build the colormoves app image from source using docker compose.
.PHONY: build
build: build-full
	docker-compose -f docker-compose.yml build

# Build the colormoves app image from source using docker engine.
.PHONY: build-image
build-image:
	docker build -t $(DOCKER_IMAGE) -f ./Dockerfile .


#############################
### INFO  ###########

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


#############################
### UTILS  ###########

# Open a browser window for the application.
.PHONY: open-browser
open-browser:
	open http://0.0.0.0:8888 &


#############################
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


#############################
### START  ###########

# Start the app.
.PHONY: start
start:
	docker-compose -f docker-compose.yml up &

.PHONY: start-app
start-app: start-image open-browser
	@echo "Starting Colormoves using latest image..." &

# Start the app.
.PHONY: start-dev
start-dev:
	docker-compose -f docker-compose.core-w-app.yml --verbose up &
# docker-compose -f docker-compose.fullcms.yml up &

.PHONY: start-src
start-src: start open-browser
	@echo "Starting Colormoves using local source..." &

.PHONY: start-image
start-image:
	docker run --name colormoves -p 8888:8888 taccwma/colormovestacc:latest &


#############################
### STOP  ###########

# Stop the running app.
.PHONY: stop
stop:
	docker-compose -f docker-compose.yml down

.PHONY: stop-app
stop-app: stop-image
	@echo "Colormoves is shutting down."

.PHONY: stop-dev
stop-dev:
	docker-compose -f docker-compose.core-w-app.yml down
# docker-compose -f docker-compose.fullcms.yml down

.PHONY: stop-src
stop-src: stop
	@echo "Colormoves is shutting down."

.PHONY: stop-image
stop-image:
	docker kill colormoves
	docker rm colormoves
