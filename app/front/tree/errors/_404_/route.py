from flask import render_template, request

from back.mongo.data.collect.clients import valid_client

def register_404_error_route(app):

    @app.errorhandler(404)
    def page_not_found(error):

        data = {"plot": {"type": None}, "code": 404, "message": "Page Not Found"}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        return render_template("tree/errors/_404_/page.html", data=data)
