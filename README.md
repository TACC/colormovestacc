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

Access the app from the browser using one of these URLs:

- localhost:8888
- 0.0.0.0:8888
- IP_ADDRESS:8888

## Using Colormoves

1. Select a color scheme from the left column and drag it into the bottom graph.
2. Select one of the `test_files/*.png` files and drag it into the upper display panel.
3. The app will colorize the example file.
4. Download the color schema to share or use in external applications.
