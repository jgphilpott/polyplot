from flask import jsonify

def register_api_maps_route(app):

    @app.route("/api/maps")
    def api_maps():

        data = None

        return jsonify(data)
