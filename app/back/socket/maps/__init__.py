from flask_socketio import emit

from back.mongo.data.collect.maps.mongo import find_map, find_maps

def connect_maps(app):

    @app.on("get_map")
    def get_map(code, detail="low"):

        emit("new_map", find_map({"code": code}, detail=detail))

    @app.on("get_maps")
    def get_maps(detail="low"):

        emit("new_maps", find_maps(detail=detail))
