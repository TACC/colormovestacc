# ColorMoves

The interactive color mapping tool used in the SciVisColor.org portal.

## Getting Started

1. Clone the source code repository.
2. Install the prerequisites.
3. Build & run the application.

## 1. Get the Source Code

`git clone https://github.com/TACC/colormovestacc.git`

## 2. Install the Prerequisites

- [Node](https://nodejs.org/en/download/) (`v18.8.0` or newer)
- [Docker](https://www.docker.com/products/docker-desktop/) (latest)
- [Make](https://www.gnu.org/software/make/) (latest)
- _Note: In order to avoid runtime environment pollution, we recommended installing and activating an environment manager such as_ [miniconda](https://docs.conda.io/en/latest/miniconda.html) _before installing the project dependencies locally_.

## 2. Build & Run Colormoves

### A. With `Node`

```
# Activate the environment (if using one).
# Install Node v18.8.0 (or newer).

# Navigate into the cloned repo.
~/> cd colormovestacc

# Install the project dependencies.
~/colormovestacc/> npm i

# Run the application.
~/colormovestacc/> node server.js
```

### B. With `Docker`

```
# Pull and run the latest published image.
~/> docker run --name colormoves -p 8888:8888 taccwma/colormovestacc:latest

--OR BUILD IMAGES FROM LOCAL SOURCE CODE--

# Navigate into the cloned repo.
~/> cd colormovestacc

# Build the colormovestacc image from source.
~/colormovestacc/> docker build -t taccwma/colormovestacc:latest .

# Start the docker container.
~/> docker run --name colormoves -p 8888:8888 sciviscolor/colormoves:latest

# Stop the locally running container.
docker kill colormoves
```

### C. With `Make`

```
# Navigate into the cloned repo.
~/> cd colormovestacc

# Build an image.
~/colormovestacc/> make build

# Build a tagged image from source.
~/colormovestacc/> make build-image

# Start the application in one of several ways.
# Note: these launch a browser window automatically.

-- From the latest published image:
~/colormovestacc/> make start-app

-- From the local source code:
~/colormovestacc/> make start-src

-- Integration testing with the full core portal stack:
~/colormovestacc/> make start-dev

# To stop the running containers and remove them, reverse the start command.
~/colormovestacc/> make stop-app
~/colormovestacc/> make stop-src
~/colormovestacc/> make stop-dev

# NOTE: Publish requires access to the taccwma dockerhub repo.

# Publish the current tagged image.
~/colormovestacc/> make publish

# Publish the current latest image:
~/colormovestacc/> make publish-latest
```

### Accessing the Colormoves Application

A browser window should launch automatically when you run the application using the make-* commands, but you can also access it by manually opening a browser window and entering any of the following URLs to the `/` or `/colormoves` endpoints:

- [localhost:8888/](localhost:8888/)
- [localhost:8888/colormoves](localhost:8888/colormoves)
- [0.0.0.0:8888/](0.0.0.0:8888/)
- [0.0.0.0:8888/colormoves](0.0.0.0:8888/colormoves)

## Using the Colormoves Application

1. Select a color scheme from the left column and drag it into the bottom graph.
2. Select one of the `colormovestacc/test_files/*.png` files (in the code repo) and drag it into the upper display panel.
3. The app will colorize the example file.
4. Download the color schema to share or use in external applications.
