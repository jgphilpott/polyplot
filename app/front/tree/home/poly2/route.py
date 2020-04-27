from flask import render_template, request

from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.indicators import find_indicator

def register_poly2_route(app):

    @app.route("/poly2")
    def poly2():

        data = {"plot": {"title": "World Bank Development Indicators", "type": "Poly2"}}

        r = find_indicator(request.args["r"]) if "r" in request.args else find_indicator("SP.POP.TOTL")
        x = find_indicator(request.args["x"]) if "x" in request.args else find_indicator("SP.DYN.LE00.IN")
        y = find_indicator(request.args["y"]) if "y" in request.args else find_indicator("SP.DYN.TFRT.IN")

        data["plot"]["r"] = {"name": r["name"]}
        data["plot"]["x"] = {"name": x["name"]}
        data["plot"]["y"] = {"name": y["name"]}
        data["plot"]["t"] = {"minYear": 1960, "year": 1970, "maxYear": 2018}

        countries = find_countries()

        for country in countries:

            country["r"] = [indicator for indicator in r["geographies"] if indicator["code"] in [country["code"]]][0]["history"]
            country["x"] = [indicator for indicator in x["geographies"] if indicator["code"] in [country["code"]]][0]["history"]
            country["y"] = [indicator for indicator in y["geographies"] if indicator["code"] in [country["code"]]][0]["history"]

        data["plot"]["plots"] = countries

        return render_template("tree/home/poly2/page.html", data=data)
