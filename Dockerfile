FROM python:3.8

RUN pip install --upgrade pip

RUN pip install fire
RUN pip install tqdm
RUN pip install Flask

RUN pip install pymongo

RUN pip install requests
RUN pip install beautifulsoup4

RUN pip install eventlet
RUN pip install Flask-SocketIO

RUN pip install Flask-Login

RUN pip install libsass

ADD . /root

WORKDIR /root

CMD ["python", "app/root.py"]
