FROM continuumio/miniconda3:latest

ADD . /root

WORKDIR /root

RUN conda update -n base -c defaults conda
RUN conda config --add channels conda-forge
RUN conda install --file requirements.txt
