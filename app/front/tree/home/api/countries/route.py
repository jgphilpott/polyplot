from flask import jsonify, request

def register_api_countries_route(app):

    @app.route("/api/countries")
    def api_countries():

        data = None

        return jsonify(data)
