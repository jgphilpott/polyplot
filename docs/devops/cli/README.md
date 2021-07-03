# Intro

The Polyplot CLI (Flint) was used in the early days of development for exploring database collections. Most of its functionality has been replaced by the [Jupyter Notebook](https://github.com/jgphilpott/polyplot/blob/master/docs/notes/README.md) service, however it does still work and **has the advantage of having root access to the Polyplot container.** You can for example explore the file system and start or end processes, which can’t be done with the Jupyter Notebook because it runs as a separate docker container.

# Getting Started

Assuming that [the Polyplot container is running](https://github.com/jgphilpott/polyplot/blob/master/docs/devops/deploy/README.md), open a terminal window and enter this command:

```
docker exec -it polyplot bash
```

This command alone will open access to the Polyplot container and if you wish you can begin your work from here. **The power of Flint however is the alias list that it comes with to help simplify workflows.** To load the Flint aliases enter the command:

```
source /root/app/back/flint/aliases.sh
```

You should see the message `Welcome to Polyplot! 😍` printed on the screen.

# Aliases

## Navigation

**Most of the Flint aliases are for retrieving documents and collections however there are also a few simple navigation aliases.** Try typing `cwd` and `lsa` to get your location on the file system and a list of all the local files and folders. Now type `cl` to clear the screen and `spark` to get a list of all the commands available to the CLI. To execute a specific common type `fire` and then a space and the name of the command.

Alias | Description
--- | ---
`cwd` | Displays the current working directory.
`lsa` | Lists all the files and folders in the current working directory.
`cl` | Clears the screen.
`spark` | Displays a list of all the commands available to the CLI.
`fire` | Executes a specific command.

## Documents & Collections

**To start, type `cols` to see a list of all the collections in the database.** For each collection there is an alias to retrieve a single document and to retrieve the entire collection. You can also add a custom query, filter, sort and limit to the commands, read the [API documentation](https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md) for more details about each of these optional arguments. You can view all of the aliases in the tables below.

### Airports

Alias | Description
--- | ---
`air` | Retrieve a single document.
`airs` | Retrieve the entire collection.

### Cities

Alias | Description
--- | ---
`cit` | Retrieve a single document.
`cits` | Retrieve the entire collection.

### Clients

Alias | Description
--- | ---
`cent` | Retrieve a single document.
`cents` | Retrieve the entire collection.

### Countries

Alias | Description
--- | ---
`coun` | Retrieve a single document.
`couns` | Retrieve the entire collection.

### Graticules

Alias | Description
--- | ---
`grat` | Retrieve a single document.
`grats` | Retrieve the entire collection.

### Indicators

Alias | Description
--- | ---
`ind` | Retrieve a single document.
`inds` | Retrieve the entire collection.

### Lakes

Alias | Description
--- | ---
`lake` | Retrieve a single document.
`lakes` | Retrieve the entire collection.

### Maps

Alias | Description
--- | ---
`map` | Retrieve a single document.
`maps` | Retrieve the entire collection.

### Metas

Alias | Description
--- | ---
`meta` | Retrieve a single document.
`metas` | Retrieve the entire collection.

### Ports

Alias | Description
--- | ---
`port` | Retrieve a single document.
`ports` | Retrieve the entire collection.

### Railroads

Alias | Description
--- | ---
`rail` | Retrieve a single document.
`rails` | Retrieve the entire collection.

### Rivers

Alias | Description
--- | ---
`riv` | Retrieve a single document.
`rivs` | Retrieve the entire collection.

### Roads

Alias | Description
--- | ---
`road` | Retrieve a single document.
`roads` | Retrieve the entire collection.
