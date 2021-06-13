from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.ports.mongo import find_ports

def register_api_ports_route(app):

    @app.route("/api/ports")
    def api_ports():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("properties.flow", -1), ("properties.code", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 0

        data = find_maps(query, filter, sort, limit)

        return jsonify(data)
