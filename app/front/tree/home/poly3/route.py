from flask import request, make_response, render_template

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.indicators import find_indicator

def register_poly3_route(app):

    @app.route("/poly3")
    def poly3():

        data = {"plot": {"title": "World Bank Development Indicators", "type": "Poly3"}}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        r_code = request.args.get("r") if "r" in request.args else request.cookies.get("r") if "r" in request.cookies else "SP.POP.TOTL"
        x_code = request.args.get("x") if "x" in request.args else request.cookies.get("x") if "x" in request.cookies else "SP.DYN.LE00.IN"
        y_code = request.args.get("y") if "y" in request.args else request.cookies.get("y") if "y" in request.cookies else "SP.DYN.TFRT.IN"
        z_code = request.args.get("z") if "z" in request.args else request.cookies.get("z") if "z" in request.cookies else "NY.GDP.PCAP.KD.ZG"

        r = find_indicator({"code": r_code})
        x = find_indicator({"code": x_code})
        y = find_indicator({"code": y_code})
        z = find_indicator({"code": z_code})

        data["plot"]["r"] = {"name": r["name"], "code": r["code"]}
        data["plot"]["x"] = {"name": x["name"], "code": x["code"]}
        data["plot"]["y"] = {"name": y["name"], "code": y["code"]}
        data["plot"]["z"] = {"name": z["name"], "code": z["code"]}
        data["plot"]["t"] = {"minYear": 1960, "year": 1970, "maxYear": 2018}

        countries = find_countries()

        for country in countries:

            country["r"] = [item for item in r["countries"] if item["code"] in [country["code"]]][0]["history"]
            country["x"] = [item for item in x["countries"] if item["code"] in [country["code"]]][0]["history"]
            country["y"] = [item for item in y["countries"] if item["code"] in [country["code"]]][0]["history"]
            country["z"] = [item for item in z["countries"] if item["code"] in [country["code"]]][0]["history"]

        data["plot"]["plots"] = countries

        response = make_response(render_template("tree/home/poly3/page.html", data=data))

        response.set_cookie("r", r_code)
        response.set_cookie("x", x_code)
        response.set_cookie("y", y_code)
        response.set_cookie("z", z_code)

        return response
