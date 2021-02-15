from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.cities.object import City

collection = find_collection("cities")

def find_city(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_cities(query={}, filter={"_id": 0}, sort=[("properties.rank", 1), ("properties.pop_avg", -1), ("properties.name", 1)]):

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort))
