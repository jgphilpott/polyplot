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

...
