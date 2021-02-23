from flask_socketio import emit

from back.mongo.data.collect.graticules.mongo import find_graticule, find_graticules

def connect_graticules(app):

    @app.on("get_graticule")
    def get_graticule(query={}, filter={"_id": 0}):

        emit("new_graticule", find_graticule(query, filter))

    @app.on("get_graticules")
    def get_graticules(query={}, filter={"_id": 0}, sort=[("step", -1)], limit=0):

        emit("new_graticules", find_graticules(query, filter, [tuple(item) for item in sort], limit))
