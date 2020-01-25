from flask import render_template
from json import dumps as jsonify

def register_map_route(app):

    @app.route("/map")
    def map():

        data = None

        return render_template("tree/home/map/page.html", data=jsonify(data))
