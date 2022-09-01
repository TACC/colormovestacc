# ColorMoves

The interactive color mapping tool used in the SciVisColor.org portal.

## Getting Started

Clone the repo: `git clone https://github.com/TACC/colormovestacc.git`

Build & run the application.

**A. Using Node**

_Make sure you have node installed: https://nodejs.org/en/download/_

```
# Install dependencies.
npm i

# Run application.
node server.js
```

**B. Using Docker**

_Make sure you have docker installed and running: https://www.docker.com/products/docker-desktop/_

```
# build the colormovestacc image.
docker build -t taccwma/colormovestacc:latest .

# start the docker container.
docker run -p 8888:8888 sciviscolor/colormoves
```

**C. Using Make**

_Make sure you have make installed locally: https://www.gnu.org/software/make/._

```
# Build an image.
make build

# Build a tagged image.
make build-full

# Start the docker container.
make start
# CTRL-C to stop.

# Stop the running containers and remove them.
make stop

# NOTE: Publish requires access to the taccwma dockerhub repo.

# Publish the current tagged image.
make publish

# Publish the current latest image:
make publish-latest
```

Access the app from the browser at the `/` or `/colormoves` endpoint:

- localhost:8888/
- 0.0.0.0:8888/
- IP_ADDRESS:8888/
- localhost:8888/colormoves
- 0.0.0.0:8888/colormoves
- IP_ADDRESS:8888/colormoves

## Using Colormoves

1. Select a color scheme from the left column and drag it into the bottom graph.
2. Select one of the `test_files/*.png` files and drag it into the upper display panel.
3. The app will colorize the example file.
4. Download the color schema to share or use in external applications.
