from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.lakes.object import Lake

collection = find_collection("lakes")

def find_lake(query={}, filter={"_id": 0}, detail="micro"):

    return dict(collection.find_one(query, filter))["detail"][detail]

def find_lakes(query={}, filter={"_id": 0}, sort=[("id", 1)], detail="micro"):

    collection.create_index(sort)

    return [lake["detail"][detail] for lake in list(collection.find(query, filter).sort(sort))]
