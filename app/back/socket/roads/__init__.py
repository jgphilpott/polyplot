from flask_socketio import emit

from back.mongo.data.collect.roads.mongo import find_road, find_roads

def connect_roads(app):

    @app.on("get_road")
    def get_road(query={}, filter={"_id": 0}, detail="micro"):

        emit("new_road", find_road(query, filter, detail))

    @app.on("get_roads")
    def get_roads(query={}, filter={"_id": 0}, sort=[("properties.id", 1)], limit=0, detail="micro"):

        emit("new_roads", find_roads(query, filter, [tuple(item) for item in sort], limit, detail))
