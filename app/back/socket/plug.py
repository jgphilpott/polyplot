from flask_socketio import SocketIO

from back.socket.airports import connect_airports
from back.socket.clients import connect_clients
from back.socket.countries import connect_countries
from back.socket.indicators import connect_indicators
from back.socket.maps import connect_maps
from back.socket.meta import connect_meta
from back.socket.ports import connect_ports

def plugin(app):

    app = SocketIO(app)

    connect_airports(app)
    connect_clients(app)
    connect_countries(app)
    connect_indicators(app)
    connect_maps(app)
    connect_meta(app)
    connect_ports(app)

    return app

def unplug(app):

    return app
