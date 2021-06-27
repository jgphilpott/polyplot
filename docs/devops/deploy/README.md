# Setup

Polyplot is deployed using [docker compose](https://docs.docker.com/compose), if you don't already have docker compose [installed](https://docs.docker.com/compose/install) then do that first. Once that's done you can proceed to the deployment step.

# Deploy

To begin clone the Polyplot repository:

```
git clone https://github.com/jgphilpott/polyplot.git
```

... navigate into the root directory:

```
cd polyplot
```

... and deploy the app:

```
docker-compose up --build
```

The build will take some time but once it’s done you can view the application by visiting `localhost:5000` in a web browser. In future deployments you can simply use the command:

```
docker-compose up
```

⚠ **The first build will take more time because the app needs to download several GB of data and write a few GB of data to the database but this is only necessary once.**

# Notes

...
