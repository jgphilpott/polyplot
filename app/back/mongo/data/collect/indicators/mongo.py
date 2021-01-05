from operator import itemgetter

from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.indicators.object import Indicator

collection = find_collection("indicators")

def find_indicator(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_indicators(query={}, filter={"_id": 0}, sort=[("completeness", True)]):

    return sorted(list(collection.find(query, filter)), key=itemgetter(sort[0][0]), reverse=sort[0][1])

def update_indicator(indicator):

    return collection.update_one({"code": indicator["code"]}, {"$set": indicator})

def update_indicators():

    for indicator in find_indicators():

        update_indicator(indicator)
