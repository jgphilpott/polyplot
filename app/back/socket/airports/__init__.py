from flask_socketio import emit

from back.mongo.data.collect.airports.mongo import find_airport, find_airports

def connect_airports(app):

    @app.on("get_airport")
    def get_airport(query={}, filter={"_id": 0}):

        emit("new_airport", find_airport(query, filter))

    @app.on("get_airports")
    def get_airports(query={}, filter={"_id": 0}, sort=[("properties.flow", -1), ("properties.code", 1)], limit=0):

        emit("new_airports", find_airports(query, filter, [tuple(item) for item in sort], limit))
