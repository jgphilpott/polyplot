from flask import render_template

from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.indicators import find_indicator
from back.mongo.data.collect.maps import find_maps

def register_map_route(app):

    @app.route("/map")
    def map():

        data = {}
        data["plot"] = {"title": "World Bank Development Indicators"}
        data["plot"]["time"] = {"yearMin": 1960, "year": 1990, "yearMax": 2019}
        data["plot"]["geoJSON"] = {"type": "FeatureCollection", "features": find_maps("large")}

        return render_template("tree/home/map/page.html", data=data)
