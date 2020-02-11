from flask import render_template

def register_index_route(app):

    @app.route("/indexes/index")
    def index():

        data = None

        return render_template("tree/home/indexes/index/page.html", data=data)
