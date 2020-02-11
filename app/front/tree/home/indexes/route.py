from flask import render_template

def register_indexes_route(app):

    @app.route("/indexes")
    def indexes():

        data = None

        return render_template("tree/home/indexes/page.html", data=data)
