FROM jgphilpott/flask-pack:plus

RUN pip install --upgrade pip
RUN pip install boussole

ADD . /root

WORKDIR /root

CMD ["python3", "app/root.py"]
