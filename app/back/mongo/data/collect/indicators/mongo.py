from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.indicators.object import Indicator

collection = find_collection("indicators")

def find_indicator(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_indicators(query={}, filter={"_id": 0}, sort=[("name", 1)]):

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort))

def update_indicator(indicator):

    return collection.update_one({"code": indicator["code"]}, {"$set": indicator})

def update_indicators():

    for indicator in find_indicators():

        update_indicator(indicator)
