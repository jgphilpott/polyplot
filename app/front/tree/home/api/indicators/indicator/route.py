from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.indicators.mongo import find_indicator

def register_api_indicator_route(app):

    @app.route("/api/indicator")
    def api_indicator():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {"countries": {"$exists": True, "$ne": []}, "completeness": {"$gt": 0}}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0, "countries": 0}

        if "_id" not in filter: filter["_id"] = 0

        data = find_indicator(query, filter)

        return jsonify(data)
