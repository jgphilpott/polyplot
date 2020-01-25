from flask import render_template
from json import dumps as jsonify

def register_two_route(app):

    @app.route("/two")
    def two():

        data = None

        return render_template("tree/home/two/page.html", data=jsonify(data))
