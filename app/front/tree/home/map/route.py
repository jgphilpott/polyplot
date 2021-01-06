from flask import request, make_response, render_template

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.indicators import find_indicator
from back.mongo.data.collect.maps import find_maps

def register_map_route(app):

    @app.route("/map")
    def map():

        data = {"plot": {"title": "World Bank Development Indicators", "type": "Map"}}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        x_code = request.args.get("x") if "x" in request.args else request.cookies.get("x") if "x" in request.cookies else "SP.DYN.LE00.IN"

        x = find_indicator({"code": x_code})

        data["plot"]["x"] = {"name": x["name"], "code": x["code"]}
        data["plot"]["t"] = {"minYear": 1960, "year": 1970, "maxYear": 2018}
        data["plot"]["GeoJSON"] = {"type": "FeatureCollection", "features": find_maps(detail="high"), "properties": {"λ": 0, "φ": 0, "γ": 0}}

        countries = find_countries()

        for country in countries:

            country["x"] = [item for item in x["countries"] if item["code"] in [country["code"]]][0]["history"]

        data["plot"]["plots"] = countries

        response = make_response(render_template("tree/home/map/page.html", data=data))

        response.set_cookie("x", x_code)

        return response
