from flask import render_template, request

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.indicators import find_indicator

def register_indicator_route(app):

    @app.route("/indicators/indicator")
    def indicator():

        data = {"plot": {"type": None}}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        return render_template("tree/home/indicators/indicator/page.html", data=data)
