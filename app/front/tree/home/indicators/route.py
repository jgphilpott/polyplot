from flask import render_template, request

from back.mongo.data.collect.clients import valid_client
from back.mongo.data.collect.indicators import find_indicators

def register_indicators_route(app):

    @app.route("/indicators")
    def indicators():

        data = {"plot": {"type": None}, "indicators": find_indicators({"countries": {"$exists": True, "$ne": []}}, {"_id": 0, "countries": 0})}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        return render_template("tree/home/indicators/page.html", data=data)
