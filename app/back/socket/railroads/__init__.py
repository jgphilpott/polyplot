from flask_socketio import emit

from back.mongo.data.collect.railroads.mongo import find_railroad, find_railroads

def connect_railroads(app):

    @app.on("get_railroad")
    def get_railroad(query={}, filter={"_id": 0}, detail="micro"):

        emit("new_railroad", find_railroad(query, filter, detail))

    @app.on("get_railroads")
    def get_railroads(query={}, filter={"_id": 0}, sort=[("properties.id", 1)], detail="micro"):

        emit("new_railroads", find_railroads(query, filter, [tuple(item) for item in sort], detail))
