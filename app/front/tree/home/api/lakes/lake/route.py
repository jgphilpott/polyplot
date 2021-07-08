from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.lakes.mongo import find_lake

def register_api_lake_route(app):

    @app.route("/api/lake")
    def api_lake():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0}
        detail = literal_eval(request.args.get("detail")) if "detail" in request.args else "micro"

        if "_id" not in filter: filter["_id"] = 0

        data = find_lake(query, filter, detail)

        return jsonify(data)
