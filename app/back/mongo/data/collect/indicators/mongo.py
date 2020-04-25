from sys import getsizeof

from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.indicators.object import Indicator

collection = find_collection("indicators")

def find_indicator(code):

    return dict(collection.find_one({"code": code}, {"_id": 0}))

def find_indicators():

    return list(collection.find({}, {"_id": 0}))

def update_indicator(code):

    indicator = Indicator(find_indicator(code)).update()

    collection.update_one({"code": indicator.code}, {"$set": indicator.__dict__})

def update_indicators():

    for indicator in find_indicators():

        update_indicator(indicator["code"])

def find_indicator_size(code):

    return getsizeof(str(find_indicator(code)))

def find_indicators_size():

    return getsizeof(str(find_indicators()))
