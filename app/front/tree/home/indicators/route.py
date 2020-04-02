from flask import render_template

from back.mongo.data.collect.indicators import find_indicators

def register_indicators_route(app):

    @app.route("/indicators")
    def indicators():

        data = None

        return render_template("tree/home/indicators/page.html", data=data)
