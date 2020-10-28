FROM jgphilpott/flask-pack:plus

ADD . /root

WORKDIR /root

CMD ["python3", "app/root.py"]
