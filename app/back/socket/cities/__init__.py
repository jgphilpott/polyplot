from flask_socketio import emit

from back.mongo.data.collect.cities.mongo import find_city, find_cities

def connect_cities(app):

    @app.on("get_city")
    def get_city(id):

        emit("new_city", find_city({"id": id}))

    @app.on("get_cities")
    def get_cities(limit):

        emit("new_cities", find_cities(limit))
