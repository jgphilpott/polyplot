from operator import itemgetter

from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.railroads.object import Railroad

collection = find_collection("railroads")

def find_railroad(query={}, filter={"_id": 0}, detail="micro"):

    return dict(collection.find_one(query, filter))["detail"][detail]

def find_railroads(query={}, filter={"_id": 0}, sort=[("id", 1)], detail="micro"):

    collection.create_index(sort)

    return [railroad["detail"][detail] for railroad in list(collection.find(query, filter).sort(sort))]
