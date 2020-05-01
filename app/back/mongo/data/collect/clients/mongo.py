from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.clients.object import Client

collection = find_collection("clients")

def find_client(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_clients(query={}, filter={"_id": 0}):

    return list(collection.find(query, filter))
