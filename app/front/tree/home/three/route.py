from flask import render_template

from back.mongo.data.collect.indexes.mongo import find_index

def register_three_route(app):

    @app.route("/three")
    def three():

        data = find_index("SP.POP.TOTL")

        return render_template("tree/home/three/page.html", data=data)
