from flask_socketio import emit

from back.mongo.data.collect.lakes.mongo import find_lake, find_lakes

def connect_lakes(app):

    @app.on("get_lake")
    def get_lake(id):

        emit("new_lake", find_lake({"id": id}))

    @app.on("get_lakes")
    def get_lakes(limit):

        emit("new_lakes", find_lakes(limit))
