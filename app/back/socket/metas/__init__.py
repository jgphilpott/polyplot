from flask_socketio import emit

from back.mongo.data.collect.metas.mongo import find_meta, find_metas

def connect_metas(app):

    @app.on("get_meta")
    def get_meta(code):

        emit("new_" + code, find_meta({"code": code.split("_")[0]})["value"])

    @app.on("get_metas")
    def get_metas(query={}, filter={"_id": 0}, sort=[("code", 1)], limit=0):

        emit("new_metas", find_metas(query, filter, [tuple(item) for item in sort], limit))
