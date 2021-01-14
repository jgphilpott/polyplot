from flask import request, make_response, render_template

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.indicators import find_indicators

def register_indicators_route(app):

    @app.route("/indicators")
    def indicators():

        data = {"plot": {"type": None}, "indicators": find_indicators({"countries": {"$exists": True, "$ne": []}}, {"_id": 0, "countries": 0})}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        r_code = request.cookies.get("r") if "r" in request.cookies else "SP.POP.TOTL"
        x_code = request.cookies.get("x") if "x" in request.cookies else "SP.DYN.LE00.IN"
        y_code = request.cookies.get("y") if "y" in request.cookies else "SP.DYN.TFRT.IN"
        z_code = request.cookies.get("z") if "z" in request.cookies else "NY.GDP.PCAP.KD.ZG"

        response = make_response(render_template("tree/home/indicators/page.html", data=data))

        response.set_cookie("r", r_code)
        response.set_cookie("x", x_code)
        response.set_cookie("y", y_code)
        response.set_cookie("z", z_code)

        return response
