from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.lakes.mongo import find_lakes

def register_api_lakes_route(app):

    @app.route("/api/lakes")
    def api_lakes():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("properties.name", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 100
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        filter["_id"] = 0

        data = find_lakes(query, filter, sort, limit, detail)

        return jsonify(data)
