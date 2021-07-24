from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.graticules.mongo import find_graticule

def register_api_graticule_route(app):

    @app.route("/api/graticule")
    def api_graticule():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {"step": 15}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {}

        filter["_id"] = 0

        data = find_graticule(query, filter)

        return jsonify(data)
