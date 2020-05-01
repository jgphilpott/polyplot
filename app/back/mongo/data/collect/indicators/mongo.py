from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.indicators.object import Indicator

collection = find_collection("indicators")

def find_indicator(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_indicators(query={}, filter={"_id": 0}):

    return list(collection.find(query, filter))

def update_indicator(code):

    indicator = Indicator(find_indicator({"code": code})).update()

    collection.update_one({"code": indicator.code}, {"$set": indicator.__dict__})

def update_indicators():

    for indicator in find_indicators():

        update_indicator(indicator["code"])
