from flask_socketio import emit

from back.mongo.data.collect.meta.mongo import find_meta

def connect_meta(app):

    @app.on("get_meta")
    def get_meta(code):

        emit("new_meta", find_meta({"code": code})["value"])
