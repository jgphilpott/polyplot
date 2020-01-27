from flask import render_template
from back.tools.geometries.sphere import spherify

def register_three_route(app):

    @app.route("/three")
    def three():

        try:

            data = spherify()

        except:

            data = None

        return render_template("tree/home/three/page.html", data=data)
