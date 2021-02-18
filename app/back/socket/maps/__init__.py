from flask_socketio import emit

from back.mongo.data.collect.maps.mongo import find_map, find_maps

def connect_maps(app):

    @app.on("get_map")
    def get_map(query={}, filter={"_id": 0}, detail="micro"):

        emit("new_map", find_map(query, filter, detail))

    @app.on("get_maps")
    def get_maps(query={}, filter={"_id": 0}, sort=[("properties.code", 1)], detail="micro"):

        emit("new_maps", find_maps(query, filter, [tuple(item) for item in sort], detail))
