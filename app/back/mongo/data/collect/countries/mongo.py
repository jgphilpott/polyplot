from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.countries.object import Country

countries = find_collection("countries")

def find_country(code):

    return countries.find_one({"code": code}, {"_id": 0})

def find_countries():

    return countries.find({}, {"_id": 0})
