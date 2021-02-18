from flask_socketio import emit

from back.mongo.data.collect.rivers.mongo import find_river, find_rivers

def connect_rivers(app):

    @app.on("get_river")
    def get_river(query={}, filter={"_id": 0}, detail="micro"):

        emit("new_river", find_river(query, filter, detail))

    @app.on("get_rivers")
    def get_rivers(query={}, filter={"_id": 0}, sort=[("properties.id", 1)], detail="micro"):

        emit("new_rivers", find_rivers(query, filter, [tuple(item) for item in sort], detail))
