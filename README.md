# ColorMoves

The interactive color mapping tool used in the SciVisColor.org portal.

## Getting Started

1. Clone the repo: `git clone https://github.com/TACC/colormovestacc.git`

2. Build & run the application.


**A. Using Node**

- _Note: It is recommended to use an environment manager such as [miniconda](https://docs.conda.io/en/latest/miniconda.html)._
- **PREREQUISITE**:  Install the correct version of [node](https://nodejs.org/en/download/) (the published image is using `v18.8.0`).

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

**B. Using Docker**

- **PREREQUISITE**: Install and run [docker](https://www.docker.com/products/docker-desktop/).

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

**C. Using Make**

- **PREREQUISITE**: Install [Make](https://www.gnu.org/software/make/).

```
# Navigate into the cloned repo.
~/> cd colormovestacc

# Build an image.
~/colormovestacc/> make build

# Build a tagged image.
~/colormovestacc/> make build-full

# Start the application in one of several ways.
# Note: these launch a browser window automatically.

-- From the latest published image:
    ~/colormovestacc/> make start-app

-- From the local source code:
    ~/colormovestacc/> make start-src

# To stop the running containers and remove them, reverse the start command.
~/colormovestacc/> make stop-app
~/colormovestacc/> make stop-src

# NOTE: Publish requires access to the taccwma dockerhub repo.

# Publish the current tagged image.
~/colormovestacc/> make publish

# Publish the current latest image:
~/colormovestacc/> make publish-latest
```

A browser window should launch automatically when you run the application, but you can also access it by manually opening a window and entering any of the following URLs:

Access the app from the browser at the `/` or `/colormoves` endpoint:

- [localhost:8888/](localhost:8888/)
- [0.0.0.0:8888/](0.0.0.0:8888/)
- `LOCAL_IP_ADDRESS:8888/`
- [localhost:8888/colormoves](localhost:8888/colormoves)
- [0.0.0.0:8888/colormoves(0.0.0.0:8888/colormoves)
- `LOCAL_IP_ADDRESS:8888/colormoves`

## Using Colormoves

1. Select a color scheme from the left column and drag it into the bottom graph.
2. Select one of the `colormovestacc/test_files/*.png` files (in the code repo) and drag it into the upper display panel.
3. The app will colorize the example file.
4. Download the color schema to share or use in external applications.
