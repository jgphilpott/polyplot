from flask import render_template

def register_indicator_route(app):

    @app.route("/indicators/indicator")
    def indicator():

        data = None

        return render_template("tree/home/indicators/indicator/page.html", data=data)
