from flask import redirect

def register_api_route(app):

    @app.route("/api")
    def api():

        return redirect("https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md")
