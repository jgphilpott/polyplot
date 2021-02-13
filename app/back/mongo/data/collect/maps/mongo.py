from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.maps.object import Map

def find_map(query={}, filter={"_id": 0}, detail="micro"):

    collection = find_collection("maps_" + detail)

    return dict(collection.find_one(query, filter))

def find_maps(query={}, filter={"_id": 0}, sort=[("properties.code", 1)], detail="micro"):

    collection = find_collection("maps_" + detail)

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort))
