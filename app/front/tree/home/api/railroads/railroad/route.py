from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.railroads.mongo import find_railroad

def register_api_railroad_route(app):

    @app.route("/api/railroad")
    def api_railroad():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        filter["_id"] = 0

        data = find_railroad(query, filter, detail)

        return jsonify(data)
