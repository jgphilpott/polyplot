from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.airports.mongo import find_airport

def register_api_airport_route(app):

    @app.route("/api/airport")
    def api_airport():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}

        if "_id" not in filter: filter["_id"] = 0

        data = find_airport(query, filter)

        return jsonify(data)
