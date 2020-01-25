from flask import render_template
from json import dumps as jsonify

def register_500_error_route(app):

    @app.errorhandler(500)
    def internal_server_error(error):

        data = None

        return render_template("tree/errors/_500_/page.html", data=jsonify(data))
