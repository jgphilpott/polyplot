from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.indicators.mongo import find_indicators

def register_api_indicators_route(app):

    @app.route("/api/indicators")
    def api_indicators():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {"countries": {"$exists": True, "$ne": []}, "completeness": {"$gt": 0}}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0, "countries": 0}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("name", 1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 0

        data = find_indicators(query, filter, sort, limit)

        return jsonify(data)
