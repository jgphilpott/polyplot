from flask_socketio import emit

from back.mongo.data.collect.countries.mongo import find_country, find_countries

def connect_countries(app):

    @app.on("get_country")
    def get_country(query={}, filter={"_id": 0, "indicators": 0, "description": 0}):

        emit("new_country", find_country(query, filter))

    @app.on("get_countries")
    def get_countries(query={}, filter={"_id": 0, "indicators": 0, "description": 0}, sort=[("name", 1)], limit=0):

        emit("new_countries", find_countries(query, filter, [tuple(item) for item in sort], limit))
