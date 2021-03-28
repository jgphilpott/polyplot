from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.rivers.model import River

def find_river(query={}, filter={"_id": 0}, detail="micro"):

    collection = find_collection("rivers_" + detail)

    return dict(collection.find_one(query, filter))

def find_rivers(query={}, filter={"_id": 0}, sort=[("properties.id", 1)], limit=0, detail="micro"):

    collection = find_collection("rivers_" + detail)

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort).limit(limit))
