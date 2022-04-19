# ColorMoves

The interactive color mapping tool

## Getting Started

```
# clone the repo.
git clone https://github.com/TACC/colormovestacc.git

# make sure you have docker installed and running.
# https://www.docker.com/products/docker-desktop/

# build the colormovestacc image.
docker build -t taccwma/colormovestacc:latest .

# start the docker container.
docker run -p 8888:8888 sciviscolor/colormoves

# access the app from the browser using one of these URLs:
# localhost:8888
# 0.0.0.0:8888
# IP_ADDRESS:8888
```

You can use the \*.png files found in the test_files folder to interact with the colormoves app.

- Select a color scheme from the left column and drag it into the bottom graph.
- Select one of the test \*.png files and drag it into the upper display panel.
- The app will colorize the example file.
- Download the color schema to share or use in external applications.
