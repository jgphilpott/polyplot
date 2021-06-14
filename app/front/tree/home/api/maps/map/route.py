from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.maps.mongo import find_map

def register_api_map_route(app):

    @app.route("/api/map")
    def api_map():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        data = find_map(query, filter, detail)

        return jsonify(data)
