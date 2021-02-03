from flask_socketio import emit

from back.mongo.data.collect.meta.mongo import find_meta, find_metas

def connect_meta(app):

    @app.on("get_meta")
    def get_meta(code):

        emit("new_" + code, find_meta({"code": code.split("-")[0]})["value"])

    @app.on("get_metas")
    def get_metas():

        emit("new_metas", find_metas())
