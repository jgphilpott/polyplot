FROM jgphilpott/flask-pack:plus

ADD . /root
WORKDIR /root

RUN apt-get update
RUN apt-get upgrade -y

CMD python3 app/root.py
