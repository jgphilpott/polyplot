from flask import render_template, request

from back.mongo.data.collect.clients import valid_client

def register_home_route(app):

    @app.route("/")
    def home():

        data = {"plot": {"type": "Home"}}

        if "id" in request.cookies: data["client"] = valid_client(request.cookies.get("id"))

        return render_template("tree/home/page.jinja", data=data)
