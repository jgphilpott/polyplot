clients = 0

def connect_clients(app):

    @app.on("connect")
    def connect():

        global clients
        clients += 1

    @app.on("disconnect")
    def disconnect():

        global clients
        clients -= 1
