from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.cities.object import City

collection = find_collection("cities")

def find_city(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_cities(query={}, filter={"_id": 0}, sort=[("id", 1)]):

    return list(collection.find(query, filter).sort(sort))
