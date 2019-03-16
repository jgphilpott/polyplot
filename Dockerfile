FROM python:3.7
ADD . /root
WORKDIR /root
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
