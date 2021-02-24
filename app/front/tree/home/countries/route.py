from flask import render_template, request

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.countries import find_countries

def register_countries_route(app):

    @app.route("/countries")
    def countries():

        data = {"plot": {"type": "Countries"}, "countries": find_countries({}, {"_id": 0, "code": 1, "name": 1, "formal_name": 1, "region": 1}, [("region", 1), ("name", 1)])}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        return render_template("tree/home/countries/page.html", data=data)
