from flask import render_template

def register_routes(app):

    @app.route("/")
    def home():

        return render_template("html/home.html")

    @app.route("/2D_scatter")
    def _2D_scatter():

        return render_template("html/2D_scatter.html")

    @app.route("/3D_scatter")
    def _3D_scatter():

        return render_template("html/3D_scatter.html")
