from flask import render_template

from back.mongo.data.collect.maps import find_maps

def register_map_route(app):

    @app.route("/map")
    def map():

        data = find_maps()

        return render_template("tree/home/map/page.html", data=data)
