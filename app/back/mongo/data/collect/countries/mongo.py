from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.countries.object import Country

collection = find_collection("countries")

def find_country(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_countries(query={}, filter={"_id": 0}, sort=[("code", 1)]):

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort))

def update_country(country):

    return collection.update_one({"code": country["code"]}, {"$set": country})

def update_countries():

    for country in find_countries():

        update_country(country)
