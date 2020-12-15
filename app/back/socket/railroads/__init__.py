from flask_socketio import emit

from back.mongo.data.collect.railroads.mongo import find_railroad, find_railroads

def connect_railroads(app):

    @app.on("get_railroad")
    def get_railroad(id):

        emit("new_railroad", find_railroad({"id": id}))

    @app.on("get_railroads")
    def get_railroads(limit):

        emit("new_railroads", find_railroads(limit))
