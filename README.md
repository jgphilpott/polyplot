<p align="center"><img width="225" height="225" src="https://github.com/jgphilpott/polyplot/blob/master/app/front/imgs/theme/logo.png"></p>

# Intro

Polyplot is a data exploration application inspired by [Ola Rosling](https://github.com/olarosling)'s [Trendalyzer](https://en.wikipedia.org/wiki/Trendalyzer) software. In March 2007 Trendalyzer was acquired by Google and is now available online as [Google Public Data](https://www.google.com/publicdata). The software features an animated scatter plot where the data points represent the countries of the world and the axes can be set to any combination of development indicators with the data animating through time. The data is also available in line and bar charts as well as a map view.

The goal of Polyplot is ...

# Quick Start

Assuming you have [docker compose installed](https://docs.docker.com/compose/install), clone this repository, navigate into the root directory and run:

```
docker-compose up --build -d
```

The build will take some time but once it’s done you can view the application by visiting `localhost:5000` in a web browser.

# Development

To start an interactive shell in the Polyplot container run:

```
docker exec -it polyplot bash
```

Next, to load the development alias set run:

```
source /root/app/back/flint/aliases.sh
```
