from flask_socketio import emit

from back.mongo.data.collect.airports.mongo import find_airport, find_airports

def connect_airports(app):

    @app.on("get_airport")
    def get_airport(code):

        emit("new_airport", find_airport({"code": code}))

    @app.on("get_airports")
    def get_airports(limit):

        emit("new_airports", find_airports(limit))
