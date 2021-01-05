from flask_socketio import emit

from back.mongo.data.collect.indicators.mongo import find_indicator, find_indicators

def connect_indicators(app):

    @app.on("get_indicator")
    def get_indicator(code):

        emit("new_indicator", find_indicator({"code": code}))

    @app.on("get_indicators")
    def get_indicators():

        emit("new_indicators", find_indicators({"countries": {"$exists": True, "$ne": []}}, {"_id": 0, "countries": 0}))
