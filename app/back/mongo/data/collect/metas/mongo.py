from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.metas.object import Meta

collection = find_collection("metas")

def find_meta(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_metas(query={}, filter={"_id": 0}, sort=[("code", 1)]):

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort))
