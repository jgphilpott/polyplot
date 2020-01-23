from flask import Flask
from flask_socketio import SocketIO
from back.settings.setup import config

app = Flask("iGraph", template_folder="app/front", static_folder="app/front")

if __name__ == "__main__":

    config(app)
    socketio = SocketIO(app)
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
