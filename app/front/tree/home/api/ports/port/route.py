from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.ports.mongo import find_port

def register_api_port_route(app):

    @app.route("/api/port")
    def api_port():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}

        filter["_id"] = 0

        data = find_port(query, filter)

        return jsonify(data)
