from flask_socketio import emit

from back.mongo.data.collect.rivers.mongo import find_river, find_rivers

def connect_rivers(app):

    @app.on("get_river")
    def get_river(id):

        emit("new_river", find_river({"id": id}))

    @app.on("get_rivers")
    def get_rivers():

        emit("new_rivers", find_rivers())
