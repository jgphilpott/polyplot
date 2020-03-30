from back.socket.plug import plugin

def launch(app):

    host = "0.0.0.0"
    port = 5000
    debug = True

    plugin(app).run(app, host=host, port=port, debug=debug)
