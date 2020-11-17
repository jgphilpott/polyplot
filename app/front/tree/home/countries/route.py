from flask import render_template, request

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.countries import find_countries

def register_countries_route(app):

    @app.route("/countries")
    def countries():

        data = {"plot": {"type": None}}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        return render_template("tree/home/countries/page.html", data=data)
