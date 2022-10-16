from flask import request, make_response, render_template, abort

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.indicators import find_indicator

def register_indicator_route(app):

    @app.route("/indicators/<indicator>")
    def indicator(indicator):

        try:

            data = {"plot": {"plots": find_indicator({"code": indicator}), "type": "Indicator"}}

            if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

            min_cap = request.args.get("minCap") if "minCap" in request.args else request.cookies.get("minCap") if "minCap" in request.cookies else data["plot"]["plots"]["min_year"]
            year = request.args.get("year") if "year" in request.args else request.cookies.get("year") if "year" in request.cookies else round((data["plot"]["plots"]["min_year"] + data["plot"]["plots"]["max_year"]) / 2)
            max_cap = request.args.get("maxCap") if "maxCap" in request.args else request.cookies.get("maxCap") if "maxCap" in request.cookies else data["plot"]["plots"]["max_year"]

            data["plot"]["t"] = {"minCap": int(min_cap), "year": int(year), "maxCap": int(max_cap)}

            response = make_response(render_template("tree/home/indicators/indicator/page.jinja", data=data))

            response.set_cookie("minCap", str(min_cap))
            response.set_cookie("year", str(year))
            response.set_cookie("maxCap", str(max_cap))

            return response

        except:

            abort(404)
