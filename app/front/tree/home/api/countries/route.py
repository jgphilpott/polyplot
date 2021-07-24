from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.countries.mongo import find_countries

def register_api_countries_route(app):

    @app.route("/api/countries")
    def api_countries():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"description": 0, "indicators": 0}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("name", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 0

        filter["_id"] = 0

        data = find_countries(query, filter, sort, limit)

        return jsonify(data)
