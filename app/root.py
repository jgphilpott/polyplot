from flask import Flask
from tools.setup import config
from flask_socketio import SocketIO

app = Flask("iGraph", template_folder="app", static_folder="app")

if __name__ == "__main__":

    config(app)
    socketio = SocketIO(app)
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
