from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.lakes.object import Lake

def find_lake(query={}, filter={"_id": 0}, detail="micro"):

    collection = find_collection("lakes_" + detail)

    return dict(collection.find_one(query, filter))

def find_lakes(query={}, filter={"_id": 0}, sort=[("properties.id", 1)], detail="micro"):

    collection = find_collection("lakes_" + detail)

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort))
