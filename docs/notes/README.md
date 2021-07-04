# Intro

Although not used in production [Jupyter Notebooks](https://jupyter.org) are the easiest way to develop and test new code for the backend. **These notebooks allow you to execute code blocks in isolated cells and mixin markdown text cells for step by step execution and instruction.** The Jupyter Notebook container that's launched [when Polyplot is deployed](https://github.com/jgphilpott/polyplot/blob/master/docs/devops/deploy/README.md) is connected to the database and runs on port `8888`.

# Getting Started

To get started try visiting `localhost:8888` in a web browser. Each deployment for the container generates a new token that you will need to access the service. To retrieve this token you will need to type two commands in your terminal. First, to enter the notebook container type:

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

Copy the `<TOKEN>` and paste it into the password field in the browser page.
