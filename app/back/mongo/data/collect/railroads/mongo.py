from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.railroads.object import Railroad

collection = find_collection("railroads")

def find_railroad(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_railroads(query={}, filter={"_id": 0}):

    return list(collection.find(query, filter))
