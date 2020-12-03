from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.airports.object import Airport

collection = find_collection("airports")

def find_airport(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_airports(query={}, filter={"_id": 0}, sort=[("flow", -1), ("code", 1)]):

    return list(collection.find(query, filter).sort(sort))
