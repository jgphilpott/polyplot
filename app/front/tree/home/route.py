from flask import render_template
from json import dumps as jsonify

def register_home_route(app):

    @app.route("/")
    def home():

        data = None

        return render_template("tree/home/page.html", data=jsonify(data))
