from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.maps.mongo import find_maps

def register_api_maps_route(app):

    @app.route("/api/maps")
    def api_maps():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("properties.code", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 0
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        filter["_id"] = 0

        data = find_maps(query, filter, sort, limit, detail)

        return jsonify(data)
