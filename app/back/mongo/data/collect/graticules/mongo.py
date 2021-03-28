from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.graticules.model import Graticule

collection = find_collection("graticules")

def find_graticule(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_graticules(query={}, filter={"_id": 0}, sort=[("step", -1)], limit=0):

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort).limit(limit))
