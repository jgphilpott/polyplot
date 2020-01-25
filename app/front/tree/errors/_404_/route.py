from flask import render_template
from json import dumps as jsonify

def register_404_error_route(app):

    @app.errorhandler(404)
    def page_not_found(error):

        data = None

        return render_template("tree/errors/_404_/page.html", data=jsonify(data))
