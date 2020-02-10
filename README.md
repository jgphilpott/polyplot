<p align="center">
  <img width="142" height="142" src="https://github.com/jgphilpott/polyplot/blob/master/app/front/imgs/icons/logo.png">
</p>

# Intro

Polyplot is a data visualization application inspired by [Hans Rosling](https://en.wikipedia.org/wiki/Hans_Rosling)'s '[Trendalyzer](https://en.wikipedia.org/wiki/Trendalyzer)' software.

# Quick Start

Assuming you have [docker compose installed](https://docs.docker.com/compose/install/), clone this repository, navigate into the root directory and run:

```
sudo docker-compose up -d
```

# Development

To start an interactive shell in the Polyplot container run:

```
sudo docker exec -it polyplot bash
```

Next, to load the development alias list run:

```
source ~/app/back/tools/flint/aliases.sh
```
