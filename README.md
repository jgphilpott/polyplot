<p align="center"><img width="225" height="225" src="https://github.com/jgphilpott/polyplot/blob/master/app/front/imgs/theme/logo.png"></p>

# Intro

[Polyplot](https://www.polyplot.app) is a data exploration application inspired by [Ola Rosling](https://github.com/olarosling)'s [Trendalyzer](https://en.wikipedia.org/wiki/Trendalyzer) software. In March 2007 Trendalyzer was acquired by Google and is now available online as [Google Public Data](https://www.google.com/publicdata). The software features an animated scatter plot where the data points represent the countries of the world, the axes can be set to any combination of development indicators and the points animate through time. The data is also available in line and bar charts as well as a map view. **The goal of Polyplot is to be the best data exploration software in the world, basically a better and sexier version of Google Public Data!**

In addition to the visual exploration software Polyplot also features an [API](https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md) and [Jupyter Notebook](https://github.com/jgphilpott/polyplot/blob/master/docs/notes/README.md) container connected to its database, so you can easily tap into the data for your own creative purposes. For a more complete list of features and highlights take a look [here](https://github.com/jgphilpott/polyplot/blob/master/docs/features/README.md).

# Quick Start

Assuming you have [docker compose installed](https://docs.docker.com/compose/install), clone this repository, navigate into the root directory and run:

```
docker-compose up --build
```

The build will take some time but once it’s done you can view the application by visiting `localhost:5000` in a web browser. For more detailed deployment instructions take a look [here](https://github.com/jgphilpott/polyplot/blob/master/docs/devops/deploy/README.md).

# Contribute

There are lots of ways you can contribute, it could be as simple as a share on social media or as involved as putting in your own pull requests. If you notice any bugs or have an idea for a new feature please [open an issue](https://github.com/jgphilpott/polyplot/issues). Looking at existing issues and joining the conversation is also a good way to get involved if you don't have a specific idea in mind.
