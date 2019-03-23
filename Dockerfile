FROM python:3.6.7-alpine

ADD . /root

WORKDIR /root

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "app.py"]
