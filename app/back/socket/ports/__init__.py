from flask_socketio import emit

from back.mongo.data.collect.ports.mongo import find_port, find_ports

def connect_ports(app):

    @app.on("get_port")
    def get_port(query={}, filter={"_id": 0}):

        emit("new_port", find_port(query, filter))

    @app.on("get_ports")
    def get_ports(query={}, filter={"_id": 0}, sort=[("properties.flow", -1), ("properties.code", 1)]):

        emit("new_ports", find_ports(query, filter, [tuple(item) for item in sort]))
