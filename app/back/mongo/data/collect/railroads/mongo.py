from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.railroads.object import Railroad

def find_railroad(query={}, filter={"_id": 0}, detail="micro"):

    collection = find_collection("railroads_" + detail)

    return dict(collection.find_one(query, filter))

def find_railroads(query={}, filter={"_id": 0}, sort=[("properties.id", 1)], limit=0, detail="micro"):

    collection = find_collection("railroads_" + detail)

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort).limit(limit))
