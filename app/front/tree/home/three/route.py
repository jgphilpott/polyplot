from flask import render_template

def register_three_route(app):

    @app.route("/three")
    def three():

        data = None

        return render_template("tree/home/three/page.html", data=data)
