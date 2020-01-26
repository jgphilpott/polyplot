from flask import render_template

def register_map_route(app):

    @app.route("/map")
    def map():

        data = None

        return render_template("tree/home/map/page.html", data=data)
