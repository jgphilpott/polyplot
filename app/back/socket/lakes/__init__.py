from flask_socketio import emit

from back.mongo.data.collect.lakes.mongo import find_lake, find_lakes

def connect_lakes(app):

    @app.on("get_lake")
    def get_lake(query={}, filter={"_id": 0}, detail="micro"):

        emit("new_lake", find_lake(query, filter, detail))

    @app.on("get_lakes")
    def get_lakes(query={}, filter={"_id": 0}, sort=[("properties.id", 1)], detail="micro"):

        emit("new_lakes", find_lakes(query, filter, [tuple(item) for item in sort], detail))
