FROM continuumio/miniconda3:latest

ADD . /root

WORKDIR /root

RUN conda install --file requirements.txt

CMD ["python", "app.py"]
