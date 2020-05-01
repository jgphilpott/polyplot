from flask_socketio import emit

from back.mongo.data.collect.indicators.mongo import find_indicator, find_indicators

def connect_indicators(app):

    @app.on("get_indicator")
    def get_indicator(code):

        emit("new_indicator", find_indicator({"code": code}))

    @app.on("get_indicators")
    def get_indicators():

        available_indicators = []

        for indicator in find_indicators():

            if "geographies" in indicator:

                del indicator["geographies"]
                available_indicators.append(indicator)

        emit("new_indicators", available_indicators)
