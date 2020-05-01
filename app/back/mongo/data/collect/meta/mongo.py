from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.meta.object import Meta

collection = find_collection("meta")

def find_meta(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))
