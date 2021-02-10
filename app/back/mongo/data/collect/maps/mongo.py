from operator import itemgetter

from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.maps.object import Map

collection = find_collection("maps")

def find_map(query={}, filter={"_id": 0}, detail="micro"):

    return dict(collection.find_one(query, filter))["detail"][detail]

def find_maps(query={}, filter={"_id": 0}, sort=[("code", False)], detail="micro"):

    maps = []

    for map in sorted(list(collection.find(query, filter)), key=itemgetter(sort[0][0]), reverse=sort[0][1]):

        maps.append(map["detail"][detail])

    return maps
