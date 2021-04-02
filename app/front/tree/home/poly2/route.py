from flask import request, make_response, render_template

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.countries import find_countries

def register_poly2_route(app):

    @app.route("/poly2")
    def poly2():

        data = {"plot": {"title": "World Bank Development Indicators", "type": "Poly2"}}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        r_code = request.args.get("r") if "r" in request.args else request.cookies.get("r") if "r" in request.cookies else "SP.POP.TOTL"
        x_code = request.args.get("x") if "x" in request.args else request.cookies.get("x") if "x" in request.cookies else "SP.DYN.LE00.IN"
        y_code = request.args.get("y") if "y" in request.args else request.cookies.get("y") if "y" in request.cookies else "SP.DYN.TFRT.IN"

        r_dash_code = r_code.replace(".", "-")
        x_dash_code = x_code.replace(".", "-")
        y_dash_code = y_code.replace(".", "-")

        countries = find_countries({}, {"_id": 0, "code": 1, "name": 1, "formal_name": 1, "region": 1, "indicators." + r_dash_code: 1, "indicators." + x_dash_code: 1, "indicators." + y_dash_code: 1, "centroid": 1, "factbook": 1, "wiki": 1, "min_year": 1, "max_year": 1})

        min_cap = request.args.get("minCap") if "minCap" in request.args else request.cookies.get("minCap") if "minCap" in request.cookies else countries[0]["min_year"]
        year = request.args.get("year") if "year" in request.args else request.cookies.get("year") if "year" in request.cookies else round((countries[0]["min_year"] + countries[0]["max_year"]) / 2)
        max_cap = request.args.get("maxCap") if "maxCap" in request.args else request.cookies.get("maxCap") if "maxCap" in request.cookies else countries[0]["max_year"]

        data["plot"]["r"] = {"name": countries[0]["indicators"][r_dash_code]["name"], "code": r_code}
        data["plot"]["x"] = {"name": countries[0]["indicators"][x_dash_code]["name"], "code": x_code}
        data["plot"]["y"] = {"name": countries[0]["indicators"][y_dash_code]["name"], "code": y_code}
        data["plot"]["t"] = {"minCap": int(min_cap), "year": int(year), "maxCap": int(max_cap)}

        for country in countries:

            country["r"] = country["indicators"][r_dash_code]["history"]
            country["x"] = country["indicators"][x_dash_code]["history"]
            country["y"] = country["indicators"][y_dash_code]["history"]

            del country["indicators"]

        data["plot"]["plots"] = countries

        response = make_response(render_template("tree/home/poly2/page.html", data=data))

        response.set_cookie("r", r_code)
        response.set_cookie("x", x_code)
        response.set_cookie("y", y_code)

        response.set_cookie("minCap", str(min_cap))
        response.set_cookie("year", str(year))
        response.set_cookie("maxCap", str(max_cap))

        return response
