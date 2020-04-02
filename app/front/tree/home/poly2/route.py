from flask import render_template

from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.indicators import find_indicator

def register_poly2_route(app):

    @app.route("/poly2")
    def poly2():

        data = {}
        data["plot"] = {"title": "World Bank Development Indicators"}
        data["plot"]["time"] = {"yearMin": 1960, "year": 1990, "yearMax": 2019}

        return render_template("tree/home/poly2/page.html", data=data)
