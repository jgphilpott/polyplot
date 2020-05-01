from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.countries.object import Country

collection = find_collection("countries")

def find_country(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_countries(query={}, filter={"_id": 0}):

    return list(collection.find(query, filter))
