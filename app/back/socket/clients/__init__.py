from hashlib import sha256
from flask_socketio import emit

from back.mongo.data.collect.clients.mongo import Client, new_client, find_client, update_client

clients = 0

def connect_clients(app):

    @app.on("connect")
    def connect():

        global clients
        clients += 1

    @app.on("disconnect")
    def disconnect():

        global clients
        clients -= 1

    @app.on("signup")
    def signup(client):

        try:

            find_client({"email": client["email"]})
            emit("signup_failed")

        except:

            client["password"] = sha256(client["password"].encode("utf-8")).hexdigest()
            client = Client(client).refresh_id()

            new_client(client.__dict__)
            emit("signup_success", client.id)

    @app.on("login")
    def login(client):

        try:

            match = find_client({"email": client["email"]}, {"_id": 0})

            if match["password"] == sha256(client["password"].encode("utf-8")).hexdigest():

                client = Client(match).refresh_id()

                update_client(client.__dict__)
                emit("login_success", client.id)

            else:

                emit("login_failed")

        except:

            emit("login_failed")
