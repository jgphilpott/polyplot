# Intro

Although not used in production [Jupyter Notebooks](https://jupyter.org) are the easiest way to develop and test new code for the backend. **These notebooks allow you to execute code blocks in isolated cells and mixin markdown text cells for step by step execution and instruction.** The Jupyter Notebook container that's launched [when Polyplot is deployed](https://github.com/jgphilpott/polyplot/blob/master/docs/devops/deploy/README.md) is connected to the database and runs on port `8888`.

# Getting Started

To get started try visiting `localhost:8888` in a web browser. Each deployment of the container generates a new token that you will need to access the service. To retrieve this token you will need to type two commands in your terminal. First, to enter the notebook container type:

```
docker exec -it notebook bash
```

To see the token type:

```
jupyter notebook list
```

You should see an output that looks something like this:

```
http://0.0.0.0:8888/?token=<TOKEN>
```

Copy the `<TOKEN>` and paste it into the password field in the browser page or copy the entire URL into the address bar.

# Notebooks

Polyplot comes preloaded with several notebooks that can be used as a starting point. These notebooks can be uploaded to your Jupyter Notebook container from the [notes folder](https://github.com/jgphilpott/polyplot/tree/master/notes) in the Polyplot repository. Try opening the `sandbox.ipynb` file, this file demonstrates how to connect to the database from a notebook and also has a list of useful installs and imports. The rest of the preloaded notes are in two categories: collections and scrapers. **Feel free to create new notebooks and categories as you see fit.**

## [Collections](https://github.com/jgphilpott/polyplot/tree/master/notes/collections)

The collection notes correspond with collections in the database and are a good place to start when exploring an existing collection.

## [Scrapers](https://github.com/jgphilpott/polyplot/tree/master/notes/scraping)

The scraper notes are for building web scrapers that update collections and create new ones.
