FROM jgphilpott/flask-pack:plus

ADD . /root
WORKDIR /root

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && curl -L https://www.npmjs.com/install.sh | sh \
    && npm install --global coffeescript \
    && npm install --global typescript

CMD python3 app/root.py