from flask import render_template, request

from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.indicators import find_indicator

def register_poly3_route(app):

    @app.route("/poly3")
    def poly3():

        data = {"plot": {"title": "World Bank Development Indicators", "type": "Poly3"}}

        r = find_indicator({"code": request.args["r"]}) if "r" in request.args else find_indicator({"code": "SP.POP.TOTL"})
        x = find_indicator({"code": request.args["x"]}) if "x" in request.args else find_indicator({"code": "SP.DYN.LE00.IN"})
        y = find_indicator({"code": request.args["y"]}) if "y" in request.args else find_indicator({"code": "SP.DYN.TFRT.IN"})
        z = find_indicator({"code": request.args["z"]}) if "z" in request.args else find_indicator({"code": "NY.GDP.PCAP.KD.ZG"})

        data["plot"]["r"] = {"name": r["name"]}
        data["plot"]["x"] = {"name": x["name"]}
        data["plot"]["y"] = {"name": y["name"]}
        data["plot"]["z"] = {"name": z["name"]}
        data["plot"]["t"] = {"minYear": 1960, "year": 1970, "maxYear": 2018}

        countries = find_countries()

        for country in countries:

            country["r"] = [indicator for indicator in r["geographies"] if indicator["code"] in [country["code"]]][0]["history"]
            country["x"] = [indicator for indicator in x["geographies"] if indicator["code"] in [country["code"]]][0]["history"]
            country["y"] = [indicator for indicator in y["geographies"] if indicator["code"] in [country["code"]]][0]["history"]
            country["z"] = [indicator for indicator in z["geographies"] if indicator["code"] in [country["code"]]][0]["history"]

        data["plot"]["plots"] = countries

        return render_template("tree/home/poly3/page.html", data=data)
