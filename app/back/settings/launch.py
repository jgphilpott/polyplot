from flask_socketio import SocketIO, emit

host = "0.0.0.0"
port = 5000

clients = 0

debug = True

def launch(app):

    socket = SocketIO(app)

    @socket.on("connect")
    def connect():
        global clients
        clients += 1
        emit("clientConnect", clients, broadcast=True)

    @socket.on("disconnect")
    def disconnect():
        global clients
        clients -= 1
        emit("clientDisconnect", clients, broadcast=True)

    socket.run(app, host=host, port=port, debug=debug)
