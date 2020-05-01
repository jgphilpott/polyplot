from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.maps.object import Map

collection = find_collection("maps")

def find_map(query={}, filter={"_id": 0}, **kwargs):

    return dict(collection.find_one(query, filter))["detail"][kwargs["detail"]]

def find_maps(query={}, filter={"_id": 0}, **kwargs):

    maps = []

    for map in list(collection.find(query, filter)):

        maps.append(map["detail"][kwargs["detail"]])

    return maps
