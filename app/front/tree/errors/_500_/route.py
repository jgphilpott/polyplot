from flask import render_template

def register_500_error_route(app):

    @app.errorhandler(500)
    def internal_server_error(error):

        data = {"code": 500, "message": "Internal Server Error"}

        return render_template("tree/errors/_500_/page.html", data=data)
