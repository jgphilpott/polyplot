from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.ports.object import Port

collection = find_collection("ports")

def find_port(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_ports(query={}, filter={"_id": 0}, sort=[("properties.flow", -1), ("properties.code", 1)], limit=0):

    collection.create_index(sort)

    return list(collection.find(query, filter).sort(sort).limit(limit))
