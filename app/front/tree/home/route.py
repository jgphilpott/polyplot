from flask import render_template
from json import dumps as jsonify

def register_home_route(app):

    @app.route("/")
    def home():

        return "hello"
        # return render_template("html/home.html", data=jsonify(data))
