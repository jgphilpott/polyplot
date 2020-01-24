from flask_socketio import SocketIO

def launch(app):

    host = "0.0.0.0"
    port = 5000
    debug = True

    socketio = SocketIO(app)
    socketio.run(app, host=host, port=port, debug=debug)
