from flask import render_template, request

from back.mongo.data.collect.clients import valid_client

def register_500_error_route(app):

    @app.errorhandler(500)
    def internal_server_error(error):

        data = {"plot": {"type": "500"}, "code": 500, "message": "Internal Server Error"}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        return render_template("tree/errors/_500_/page.html", data=data)
