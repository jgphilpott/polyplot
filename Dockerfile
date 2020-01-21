FROM docker.pkg.github.com/jumanji-lab/docker-images/flask-pack:v1

RUN pip install --upgrade pip

RUN pip install tqdm

ADD . /root

WORKDIR /root
