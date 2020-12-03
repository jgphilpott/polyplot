from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.maps.object import Map

collection = find_collection("maps")

def find_map(query={}, filter={"_id": 0}, detail="low"):

    return dict(collection.find_one(query, filter))["detail"][detail]

def find_maps(query={}, filter={"_id": 0}, sort=[("code", 1)], detail="low"):

    maps = []

    for map in list(collection.find(query, filter).sort(sort)):

        maps.append(map["detail"][detail])

    return maps
