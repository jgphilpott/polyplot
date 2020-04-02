from flask import render_template

from back.mongo.data.collect.indicators import find_indicator

def register_indicator_route(app):

    @app.route("/indicators/indicator")
    def indicator():

        data = None

        return render_template("tree/home/indicators/indicator/page.html", data=data)
