from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.cities.mongo import find_city

def register_api_city_route(app):

    @app.route("/api/city")
    def api_city():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}

        if "_id" not in filter: filter["_id"] = 0

        data = find_city(query, filter)

        return jsonify(data)
