from flask import render_template

from back.mongo.data.collect.countries import find_country

def register_country_route(app):

    @app.route("/countries/country")
    def country():

        data = None

        return render_template("tree/home/countries/country/page.html", data=data)
