from flask import render_template

def register_countries_route(app):

    @app.route("/countries")
    def countries():

        data = None

        return render_template("tree/home/countries/page.html", data=data)
