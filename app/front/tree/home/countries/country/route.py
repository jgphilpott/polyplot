from flask import render_template

def register_country_route(app):

    @app.route("/countries/country")
    def country():

        data = None

        return render_template("tree/home/countries/country/page.html", data=data)
