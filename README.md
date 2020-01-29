<p align="center">
  <img width="150" height="150" src="https://github.com/jgphilpott/iGraph/blob/master/app/front/imgs/icons/icon.jpg">
</p>

# Intro

iGraph is a data visualization application inspired by [Hans Rosling](https://en.wikipedia.org/wiki/Hans_Rosling)'s '[Trendalyzer](https://en.wikipedia.org/wiki/Trendalyzer)' software. A live demo of version one is available [here](http://i-graph.herokuapp.com/), deployed at [commit 38](https://github.com/jgphilpott/iGraph/tree/dcc0bb9afa1dc0c107565d8ff8ca3ad4b5a07be6).

# Content

 - [Intro](https://github.com/jgphilpott/iGraph#intro)
 - [Content](https://github.com/jgphilpott/iGraph#content)
 - [Quick Start](https://github.com/jgphilpott/iGraph#quick-start)
 - [Development](https://github.com/jgphilpott/iGraph#development)

# Quick Start

Assuming you have [docker compose installed](https://docs.docker.com/compose/install/), clone this repository, navigate into the root directory and run:

```
sudo docker-compose up -d
```

# Development

To start an interactive shell in the iGraph container run:

```
sudo docker exec -it iGraph bash
```

Next, to load the development alias list run:

```
source ~/app/back/tools/flint/aliases.sh
```
