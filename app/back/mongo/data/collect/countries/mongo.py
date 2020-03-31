from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.countries.object import Country

collection = find_collection("countries")

def find_country(code):

    return dict(collection.find_one({"code": code}, {"_id": 0}))

def find_countries():

    return list(collection.find({}, {"_id": 0}))
