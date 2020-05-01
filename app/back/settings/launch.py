from back.socket.plug import plugin

def launch(app):

    plugin(app).run(app, host="0.0.0.0", port=5000, debug=True)
