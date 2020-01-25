FROM docker.pkg.github.com/jgphilpott/docker-images/flask-pack:v4

RUN pip install --upgrade pip

RUN pip install tqdm

ADD . /root

WORKDIR /root
