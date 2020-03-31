from flask import render_template

from back.mongo.data.collect.countries.mongo import find_countries

def register_countries_route(app):

    @app.route("/countries")
    def countries():

        data = find_countries()

        return render_template("tree/home/countries/page.html", data=data)
