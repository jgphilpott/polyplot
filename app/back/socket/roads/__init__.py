from flask_socketio import emit

from back.mongo.data.collect.roads.mongo import find_road, find_roads

def connect_roads(app):

    @app.on("get_road")
    def get_road(id):

        emit("new_road", find_road({"id": id}))

    @app.on("get_roads")
    def get_roads(limit):

        emit("new_roads", find_roads(limit))
