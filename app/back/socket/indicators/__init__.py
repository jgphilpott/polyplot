from flask_socketio import emit

from back.mongo.data.collect.indicators.mongo import find_indicator, find_indicators

def connect_indicators(app):

    @app.on("get_indicator")
    def get_indicator(query={"countries": {"$exists": True, "$ne": []}, "completeness": {"$gt": 0}}, filter={"_id": 0, "countries": 0}):

        emit("new_indicator", find_indicator(query, filter))

    @app.on("get_indicators")
    def get_indicators(query={"countries": {"$exists": True, "$ne": []}, "completeness": {"$gt": 0}}, filter={"_id": 0, "countries": 0}, sort=[("name", 1)], limit=0):

        emit("new_indicators", find_indicators(query, filter, [tuple(item) for item in sort], limit))
