from flask import render_template

def register_indicators_route(app):

    @app.route("/indicators")
    def indicators():

        data = None

        return render_template("tree/home/indicators/page.html", data=data)
