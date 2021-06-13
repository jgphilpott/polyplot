from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.airports.mongo import find_airports

def register_api_airports_route(app):

    @app.route("/api/airports")
    def api_airports():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("properties.flow", -1), ("properties.code", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 0

        data = find_airports(query, filter, sort, limit)

        return jsonify(data)
