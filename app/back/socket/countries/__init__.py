from flask_socketio import emit

from back.mongo.data.collect.countries.mongo import find_country, find_countries

def connect_countries(app):

    @app.on("get_country")
    def get_country(code):

        emit("new_country", find_country(code))

    @app.on("get_countries")
    def get_countries():

        emit("new_countries", find_countries())
