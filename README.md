<p align="center"><img width="225" height="225" src="https://github.com/jgphilpott/polyplot/blob/master/app/front/imgs/theme/logo.png"></p>

# Intro

[Polyplot](https://www.polyplot.app) is a data exploration application inspired by [Ola Rosling](https://github.com/olarosling)'s [Trendalyzer](https://en.wikipedia.org/wiki/Trendalyzer) software. In March 2007 Trendalyzer was acquired by Google and is now available online as [Google Public Data](https://www.google.com/publicdata). The software features an animated scatter plot where the data points represent the countries of the world, the axes can be set to any combination of development indicators and the plot animates through time. The data is also available in line and bar charts as well as a map view. **The goal of Polyplot is to be the best data exploration software in the world, basically a better and sexier version of Google Public Data.** This objective is achieved in a variety of ways listed below.

### ~ Open Source

Polyplot has been built on GitHub from day one! The power of git and open source is that it enables the internet hive mind to collaborate on a project in a way that's impossible for a small closed group of developers. **You are encouraged to clone, fork and modify the code in any way you like!** If you find any bugs or have an idea for a new feature please [open an issue](https://github.com/jgphilpott/polyplot/issues).

### ~ 3D View
### ~ Improved Map
### ~ Improved UI
### ~ API
### ~ Auto Updates
### ~ Notebooks

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
