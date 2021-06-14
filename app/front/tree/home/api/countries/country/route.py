from ast import literal_eval
from flask import jsonify, request
from back.mongo.data.collect.countries.mongo import find_country

def register_api_country_route(app):

    @app.route("/api/country")
    def api_country():

        query = literal_eval(request.args.get("query")) if "query" in request.args else {}
        filter = literal_eval(request.args.get("filter")) if "filter" in request.args else {"_id": 0, "indicators": 0}

        data = find_country(query, filter)

        return jsonify(data)
