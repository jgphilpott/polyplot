from flask import render_template

def register_poly2_route(app):

    @app.route("/poly2")
    def poly2():

        data = None

        return render_template("tree/home/poly2/page.html", data=data)
