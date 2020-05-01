<p align="center">
  <img width="142" height="142" src="https://github.com/jgphilpott/polyplot/blob/master/app/front/imgs/theme/logo.png">
</p>

# Intro

Polyplot is a data exploration application inspired by [Ola Rosling](https://github.com/olarosling)'s [Trendalyzer](https://en.wikipedia.org/wiki/Trendalyzer) software.

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
