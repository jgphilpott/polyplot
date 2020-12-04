from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.rivers.object import River

collection = find_collection("rivers")

def find_river(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_rivers(query={}, filter={"_id": 0}, sort=[("rank", 1), ("name", 1), ("id", 1)]):

    return list(collection.find(query, filter).sort(sort))
