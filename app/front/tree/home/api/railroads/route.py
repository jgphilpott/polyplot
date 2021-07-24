from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.railroads.mongo import find_railroads

def register_api_railroads_route(app):

    @app.route("/api/railroads")
    def api_railroads():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("properties.id", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 100
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        filter["_id"] = 0

        data = find_railroads(query, filter, sort, limit, detail)

        return jsonify(data)
