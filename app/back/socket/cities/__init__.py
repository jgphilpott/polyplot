from flask_socketio import emit

from back.mongo.data.collect.cities.mongo import find_city, find_cities

def connect_cities(app):

    @app.on("get_city")
    def get_city(query={}, filter={"_id": 0}):

        emit("new_city", find_city(query, filter))

    @app.on("get_cities")
    def get_cities(query={}, filter={"_id": 0}, sort=[("properties.rank", 1), ("properties.pop_avg", -1), ("properties.name", 1)], limit=0):

        emit("new_cities", find_cities(query, filter, [tuple(item) for item in sort], limit))
