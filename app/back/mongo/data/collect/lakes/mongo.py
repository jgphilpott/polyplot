from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.lakes.object import Lake

collection = find_collection("lakes")

def find_lake(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_lakes(query={}, filter={"_id": 0}, sort=[("rank", 1), ("name", 1), ("id", 1)]):

    return list(collection.find(query, filter).sort(sort))
