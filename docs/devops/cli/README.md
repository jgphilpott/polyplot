# Intro

The Polyplot CLI (Flint) was used in the early days of development for exploring database collections. Most of its functionality has been replaced by the [Jupyter Notebook](https://github.com/jgphilpott/polyplot/blob/master/docs/notes/README.md) service, however it does still work and **has the advantage of having root access to the Polyplot container.** You can for example explore the file system and start or end processes, which can’t be done with the Jupyter Notebook because it runs as a separate docker container.

# Getting Started

Assuming that [the Polyplot container is running](https://github.com/jgphilpott/polyplot/blob/master/docs/devops/deploy/README.md), open a terminal window and enter this command:

```
docker exec -it polyplot bash
```

This command alone will open access to the Polyplot container and if you wish you can begin your work from here. **The power of Flint however is the alias list that it comes with to help simplify workflows.** To load the Flint Aliases enter the command:

```
source /root/app/back/flint/aliases.sh
```

You should see the message `Welcome to Polyplot! 😍` printed on the screen.

# Aliases

## Navigation

**Most of the Flint aliases are for retrieving collections and documents however there are also a few simple navigation aids.** Try typing `cwd` and `lsa` to get your location on the file system and a list of all the local files and folders. Now type `cl` to clear the screen and `spark` to get a list of all the commands available to the CLI. To execute a specific common type `fire` and then a space and the name of the command.

Command | Description
--- | ---
`cwd` | Displays the current working directory.
`lsa` | Lists all the files and folders in the current working directory.
`cl` | Clears the screen.
`spark` | Displays a list of all the commands available to the CLI.
`fire` | Executes a specific command.

## Collections

...
