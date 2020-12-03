from flask_socketio import emit

from back.mongo.data.collect.ports.mongo import find_port, find_ports

def connect_ports(app):

    @app.on("get_port")
    def get_port(code):

        emit("new_port", find_port({"code": code}))

    @app.on("get_ports")
    def get_ports():

        emit("new_ports", find_ports())
