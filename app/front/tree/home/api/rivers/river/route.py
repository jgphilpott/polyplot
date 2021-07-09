from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.rivers.mongo import find_river

def register_api_river_route(app):

    @app.route("/api/river")
    def api_river():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        filter["_id"] = 0

        data = find_river(query, filter, detail)

        return jsonify(data)
