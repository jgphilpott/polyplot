from flask import render_template, request, abort

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.indicators import find_indicator

def register_indicator_route(app):

    @app.route("/indicators/<indicator>")
    def indicator(indicator):

        try:

            data = {"plot": {"type": None}, "indicator": find_indicator({"code": indicator})}

            if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

            return render_template("tree/home/indicators/indicator/page.html", data=data)

        except:

            abort(404)
