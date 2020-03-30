from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.indicators.object import Indicator

indicators = find_collection("indicators")

def find_indicator(indicator):

    code = indicator

    return indicators.find_one({"code": code}, {"_id": 0})

def find_indicators():

    return indicators.find({}, {"_id": 0})

def update_indicator(code):

    indicator = find_indicator(code)
    indicator = Indicator(indicator)
    indicator.update()

    indicators.update_one({"code": indicator.code}, {"$set": indicator.__dict__})

def update_indicators():

    for indicator in find_indicators():

        update_indicator(indicator["code"])
