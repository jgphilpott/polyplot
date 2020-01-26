from flask import render_template

def register_404_error_route(app):

    @app.errorhandler(404)
    def page_not_found(error):

        data = None

        return render_template("tree/errors/_404_/page.html", data=data)
