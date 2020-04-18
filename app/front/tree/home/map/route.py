from flask import render_template, request

from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.indicators import find_indicator
from back.mongo.data.collect.maps import find_maps

def register_map_route(app):

    @app.route("/map")
    def map():

        data = {"plot": {"title": "World Bank Development Indicators", "type": "Map"}}

        x = find_indicator(request.args["x"]) if "x" in request.args else find_indicator("SP.DYN.LE00.IN")

        data["plot"]["x"] = {"name": x["name"]}
        data["plot"]["t"] = {"minYear": 1960, "year": 1990, "maxYear": 2019}
        data["plot"]["GeoJSON"] = {"type": "FeatureCollection", "features": find_maps("high")}

        countries = find_countries()

        for country in countries:

            country["x"] = [indicator for indicator in x["geographies"] if indicator["code"] in [country["code"]]][0]["history"]

        data["plot"]["plots"] = countries

        return render_template("tree/home/map/page.html", data=data)
