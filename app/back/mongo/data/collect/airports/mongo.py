from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.airports.model import Airport

collection = find_collection("airports")

def find_airport(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_airports(query={}, filter={"_id": 0}, sort=[("properties.flow", -1), ("properties.code", 1)], limit=0):

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort).limit(limit))
