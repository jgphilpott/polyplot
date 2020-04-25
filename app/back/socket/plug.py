from flask_socketio import SocketIO

from back.socket.clients import connect_clients
from back.socket.countries import connect_countries
from back.socket.indicators import connect_indicators
from back.socket.maps import connect_maps

def plugin(app):

    app = SocketIO(app)

    connect_clients(app)
    connect_countries(app)
    connect_indicators(app)
    connect_maps(app)

    return app

def unplug(app):

    return app
