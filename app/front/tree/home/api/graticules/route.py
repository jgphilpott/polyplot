from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.graticules.mongo import find_graticules

def register_api_graticules_route(app):

    @app.route("/api/graticules")
    def api_graticules():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {"step": {"$in": [10, 20, 30]}}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        sort = literal_eval(request.args.get("sort")) if "sort" in request.args else [("step", -1)]
        limit = literal_eval(request.args.get("limit")) if "limit" in request.args else 0

        data = find_graticules(query, filter, sort, limit)

        return jsonify(data)
