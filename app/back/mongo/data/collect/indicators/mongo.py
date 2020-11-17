from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.indicators.object import Indicator

collection = find_collection("indicators")

def find_indicator(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_indicators(query={}, filter={"_id": 0}):

    return list(collection.find(query, filter))

def update_indicator(indicator):

    return collection.update_one({"code": indicator["code"]}, {"$set": indicator})

def update_indicators():

    for indicator in find_indicators({}, {"_id": 0}):

        update_indicator(indicator)
