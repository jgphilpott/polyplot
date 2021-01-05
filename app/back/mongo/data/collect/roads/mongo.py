from operator import itemgetter

from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.roads.object import Road

collection = find_collection("roads")

def find_road(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_roads(query={}, filter={"_id": 0}, sort=[("id", False)]):

    return sorted(list(collection.find(query, filter)), key=itemgetter(sort[0][0]), reverse=sort[0][1])
