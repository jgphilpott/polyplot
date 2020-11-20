from flask import render_template, request, abort

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.countries import find_country

def register_country_route(app):

    @app.route("/countries/<country>")
    def country(country):

        try:

            data = {"plot": {"type": None}, "country": find_country({"code": country})}

            if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

            return render_template("tree/home/countries/country/page.html", data=data)

        except:

            abort(404)
