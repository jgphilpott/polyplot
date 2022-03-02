# Setup

Polyplot is deployed using [docker compose](https://docs.docker.com/compose), if you don't already have docker compose [installed](https://docs.docker.com/compose/install) then do that now. Once that's done you can proceed to the deployment step.

# Deploy

To begin, clone the Polyplot repository:

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

The build will take some time but once it’s done you can view the application by visiting `localhost:5000` in a web browser. To end the deployment use:

```
Ctrl + Shift + C
```

... in future deployments you can simply use the commands:

```
docker-compose start
```

... and:

```
docker-compose stop
```

:warning: **The first deployment will take more time because the app needs to download several GB of data and write a few GB of data to the database but this is only necessary once.**

# Notes

The docker compose commands mentioned above will launch three containers; a MongoDB container on port `27017`, a Jupyter Notebook container on port `8888` and the main Polyplot container on port `5000`. If you want to view the status of your containers use the command:

```
docker container ls
```