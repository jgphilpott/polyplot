from flask import request, make_response, render_template

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.indicators import find_indicator

def register_poly2_route(app):

    @app.route("/poly2")
    def poly2():

        data = {"plot": {"title": "World Bank Development Indicators", "type": "Poly2"}}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        r_code = request.args.get("r") if "r" in request.args else request.cookies.get("r") if "r" in request.cookies else "SP.POP.TOTL"
        x_code = request.args.get("x") if "x" in request.args else request.cookies.get("x") if "x" in request.cookies else "SP.DYN.LE00.IN"
        y_code = request.args.get("y") if "y" in request.args else request.cookies.get("y") if "y" in request.cookies else "SP.DYN.TFRT.IN"

        min_cap = request.args.get("minCap") if "minCap" in request.args else request.cookies.get("minCap") if "minCap" in request.cookies else "1960"
        year = request.args.get("year") if "year" in request.args else request.cookies.get("year") if "year" in request.cookies else "1990"
        max_cap = request.args.get("maxCap") if "maxCap" in request.args else request.cookies.get("maxCap") if "maxCap" in request.cookies else "2020"

        r = find_indicator({"code": r_code})
        x = find_indicator({"code": x_code})
        y = find_indicator({"code": y_code})

        data["plot"]["r"] = {"name": r["name"], "code": r["code"]}
        data["plot"]["x"] = {"name": x["name"], "code": x["code"]}
        data["plot"]["y"] = {"name": y["name"], "code": y["code"]}
        data["plot"]["t"] = {"minCap": int(min_cap), "year": int(year), "maxCap": int(max_cap)}

        countries = find_countries()

        for country in countries:

            country["r"] = [item for item in r["countries"] if item["code"] in [country["code"]]][0]["history"]
            country["x"] = [item for item in x["countries"] if item["code"] in [country["code"]]][0]["history"]
            country["y"] = [item for item in y["countries"] if item["code"] in [country["code"]]][0]["history"]

        data["plot"]["plots"] = countries

        response = make_response(render_template("tree/home/poly2/page.html", data=data))

        response.set_cookie("r", r_code)
        response.set_cookie("x", x_code)
        response.set_cookie("y", y_code)

        response.set_cookie("minCap", min_cap)
        response.set_cookie("year", year)
        response.set_cookie("maxCap", max_cap)

        return response
