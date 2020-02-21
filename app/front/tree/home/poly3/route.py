from flask import render_template, request

from back.mongo.data.collect.indexes import find_index
from back.mongo.data.collect.countries import find_countries

def register_poly3_route(app):

    @app.route("/poly3")
    def poly3():

        try:

            data = {}
            data["plot"] = {"title": "World Bank Development Indicators"}
            data["plot"]["time"] = {"yearMin": 1960, "year": 1990, "yearMax": 2019}

            r = find_index(request.args["r"]) if "r" in request.args else find_index("SP.POP.TOTL")
            x = find_index(request.args["x"]) if "x" in request.args else find_index("SP.DYN.LE00.IN")
            y = find_index(request.args["y"]) if "y" in request.args else find_index("SP.DYN.TFRT.IN")
            z = find_index(request.args["z"]) if "z" in request.args else find_index("NY.GDP.PCAP.KD.ZG")

            data["plot"]["r"] = {"name": r["name"]}
            data["plot"]["x"] = {"name": x["name"]}
            data["plot"]["y"] = {"name": y["name"]}
            data["plot"]["z"] = {"name": z["name"]}

            countries = list(find_countries())

            for country in countries:

                country["r"] = [index for index in r["geographies"] if index["code"] in [country["code"]]][0]["history"]
                country["x"] = [index for index in x["geographies"] if index["code"] in [country["code"]]][0]["history"]
                country["y"] = [index for index in y["geographies"] if index["code"] in [country["code"]]][0]["history"]
                country["z"] = [index for index in z["geographies"] if index["code"] in [country["code"]]][0]["history"]

            data["plot"]["plots"] = countries

        except:

            data = None

        return render_template("tree/home/poly3/page.html", data=data)
