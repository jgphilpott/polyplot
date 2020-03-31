from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.maps.object import Map

collection = find_collection("maps")

def find_map(code, detail="small"):

    return dict(collection.find_one({"code": code}, {"_id": 0}))["detail"][detail]

def find_maps(detail="small"):

    maps = []

    for map in list(collection.find({}, {"_id": 0})):

        if map["detail"][detail]:

            maps.append(map["detail"][detail])

    return maps
