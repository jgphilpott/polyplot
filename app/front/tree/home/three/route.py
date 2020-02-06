from flask import render_template

from back.mongo.data.collect.indexes import find_index
from back.mongo.data.collect.countries import find_countries

def register_three_route(app):

    @app.route("/three")
    def three():

        r_index = "SP.POP.TOTL"
        x_index = "SP.DYN.LE00.IN"
        y_index = "SP.DYN.TFRT.IN"
        z_index = "NY.GDP.PCAP.KD.ZG"

        try:

            countries = list(find_countries())

            r = find_index(r_index)["geographies"]
            x = find_index(x_index)["geographies"]
            y = find_index(y_index)["geographies"]
            z = find_index(z_index)["geographies"]

            for country in countries:

                country["r"] = [index for index in r if index["code"] in [country["code"]]][0]["history"]
                country["x"] = [index for index in x if index["code"] in [country["code"]]][0]["history"]
                country["y"] = [index for index in y if index["code"] in [country["code"]]][0]["history"]
                country["z"] = [index for index in y if index["code"] in [country["code"]]][0]["history"]

            data = countries

        except:

            data = None

        return render_template("tree/home/three/page.html", data=data)
