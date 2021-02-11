from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.maps.object import Map

collection = find_collection("maps")

def find_map(query={}, filter={"_id": 0}, detail="micro"):

    return dict(collection.find_one(query, filter))["detail"][detail]

def find_maps(query={}, filter={"_id": 0}, sort=[("code", 1)], detail="micro"):

    collection.create_index(sort)

    return [map["detail"][detail] for map in list(collection.find(query, filter).sort(sort))]
