from flask import render_template
from json import dumps as jsonify
from mongo.collections import get_collection

def register_routes(app):

    @app.route("/")
    def home():

        return render_template("html/home.html")

    @app.route("/2D_scatter")
    def _2D_scatter():

        return render_template("html/2D_scatter.html")

    @app.route("/3D_scatter")
    def _3D_scatter():

        data = [1, 2, 3, 4, 5]

        # data = list(get_collection("SP.POP.TOTL"))

        return render_template("html/3D_scatter.html", data=jsonify(data))
