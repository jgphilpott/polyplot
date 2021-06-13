from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.rivers.mongo import find_rivers

def register_api_rivers_route(app):

    @app.route("/api/rivers")
    def api_rivers():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("properties.id", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 0
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        data = find_rivers(query, filter, sort, limit, detail)

        return jsonify(data)
