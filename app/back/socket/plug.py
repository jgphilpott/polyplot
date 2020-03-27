from flask_socketio import SocketIO, emit

clients = 0

def plugin(app):

    app = SocketIO(app)

    @app.on("connect")
    def connect():

        global clients
        clients += 1

        emit("clientConnect", clients, broadcast=True)

    @app.on("disconnect")
    def disconnect():

        global clients
        clients -= 1

        emit("clientDisconnect", clients, broadcast=True)

    return app

def unplug(app):

    return app
