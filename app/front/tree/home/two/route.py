from flask import render_template

def register_two_route(app):

    @app.route("/two")
    def two():

        data = None

        return render_template("tree/home/two/page.html", data=data)
