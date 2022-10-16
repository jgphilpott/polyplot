from flask import request, make_response, render_template

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.countries import find_countries
from back.mongo.data.collect.maps import find_maps

def register_map_route(app):

    @app.route("/map")
    def map():

        data = {"plot": {"title": "World Bank Development Indicators", "type": "Map"}}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        x_code = request.args.get("x") if "x" in request.args else request.cookies.get("x") if "x" in request.cookies else "SP.DYN.LE00.IN"

        x_dash_code = x_code.replace(".", "-")

        countries = find_countries({}, {"_id": 0, "code": 1, "name": 1, "formal_name": 1, "region": 1, "indicators." + x_dash_code: 1, "centroid": 1, "factbook": 1, "wiki": 1, "min_year": 1, "max_year": 1})

        min_cap = request.args.get("minCap") if "minCap" in request.args else request.cookies.get("minCap") if "minCap" in request.cookies else countries[0]["min_year"]
        year = request.args.get("year") if "year" in request.args else request.cookies.get("year") if "year" in request.cookies else round((countries[0]["min_year"] + countries[0]["max_year"]) / 2)
        max_cap = request.args.get("maxCap") if "maxCap" in request.args else request.cookies.get("maxCap") if "maxCap" in request.cookies else countries[0]["max_year"]

        data["plot"]["x"] = {"code": x_code, "name": countries[0]["indicators"][x_dash_code]["name"], "categories": countries[0]["indicators"][x_dash_code]["categories"]}
        data["plot"]["t"] = {"minCap": int(min_cap), "year": int(year), "maxCap": int(max_cap)}
        data["plot"]["GeoJSON"] = {"type": "FeatureCollection", "features": find_maps(detail="micro"), "properties": {}}

        for country in countries:

            country["x"] = country["indicators"][x_dash_code]["history"]

            del country["indicators"]

        data["plot"]["plots"] = countries

        response = make_response(render_template("tree/home/map/page.jinja", data=data))

        response.set_cookie("x", x_code)

        response.set_cookie("minCap", str(min_cap))
        response.set_cookie("year", str(year))
        response.set_cookie("maxCap", str(max_cap))

        return response
