from flask import request, make_response, render_template, abort

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.indicators import find_indicator

def register_indicator_route(app):

    @app.route("/indicators/<indicator>")
    def indicator(indicator):

        try:

            data = {"plot": {"type": None}, "indicator": find_indicator({"code": indicator})}

            if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

            min_cap = request.args.get("minCap") if "minCap" in request.args else request.cookies.get("minCap") if "minCap" in request.cookies else "1960"
            year = request.args.get("year") if "year" in request.args else request.cookies.get("year") if "year" in request.cookies else "1990"
            max_cap = request.args.get("maxCap") if "maxCap" in request.args else request.cookies.get("maxCap") if "maxCap" in request.cookies else "2020"

            response = make_response(render_template("tree/home/indicators/indicator/page.html", data=data))

            response.set_cookie("minCap", min_cap)
            response.set_cookie("year", year)
            response.set_cookie("maxCap", max_cap)

            return response

        except:

            abort(404)
