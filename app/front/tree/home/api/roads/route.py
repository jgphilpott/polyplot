from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.roads.mongo import find_roads

def register_api_roads_route(app):

    @app.route("/api/roads")
    def api_roads():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("properties.id", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 100
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        filter["_id"] = 0

        data = find_roads(query, filter, sort, limit, detail)

        return jsonify(data)
