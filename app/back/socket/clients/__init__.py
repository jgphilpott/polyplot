from flask_socketio import emit

from back.mongo.data.collect.clients.mongo import find_client, find_clients

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
