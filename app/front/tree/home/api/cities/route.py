from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.cities.mongo import find_cities

def register_api_cities_route(app):

    @app.route("/api/cities")
    def api_cities():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("properties.rank", 1), ("properties.pop_avg", -1), ("properties.name", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 0

        if "_id" not in filter: filter["_id"] = 0

        data = find_cities(query, filter, sort, limit)

        return jsonify(data)
