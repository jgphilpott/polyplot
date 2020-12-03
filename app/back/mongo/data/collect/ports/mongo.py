from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.ports.object import Port

collection = find_collection("ports")

def find_port(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_ports(query={}, filter={"_id": 0}, sort=[("flow", -1), ("code", 1)]):

    return list(collection.find(query, filter).sort(sort))
