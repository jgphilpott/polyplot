from flask import jsonify, request

def register_api_indicators_route(app):

    @app.route("/api/indicators")
    def api_indicators():

        data = None

        return jsonify(data)
