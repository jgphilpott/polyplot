from flask import render_template
from json import dumps as jsonify
from back.mongo.collections import get_collection

def register(app):

    data  = None

    @app.route("/")
    def home():

        return render_template("html/home.html", data=jsonify(data))

    @app.route("/2D_scatter")
    def _2D_scatter():

        return render_template("html/2D_scatter.html", data=jsonify(data))

    @app.route("/3D_scatter")
    def _3D_scatter():

        # collection = get_collection("SP.POP.TOTL").find()[0]
        # data = list(collection)

        return render_template("html/3D_scatter.html", data=jsonify(data))
