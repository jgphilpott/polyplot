from flask_socketio import emit

from back.mongo.data.collect.graticules.mongo import find_graticule, find_graticules

def connect_graticules(app):

    @app.on("get_graticule")
    def get_graticule(step=15):

        emit("new_graticule", find_graticule({"step": step}))

    @app.on("get_graticules")
    def get_graticules(steps=[10, 20, 30]):

        emit("new_graticules", find_graticules({"step": {"$in": steps}}))
