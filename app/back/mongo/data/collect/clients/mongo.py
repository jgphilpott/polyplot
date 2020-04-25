from sys import getsizeof

from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.clients.object import Client

collection = find_collection("clients")

def find_client(name):

    return dict(collection.find_one({"name": name}, {"_id": 0}))

def find_clients():

    return list(collection.find({}, {"_id": 0}))

def find_client_size(name):

    return getsizeof(str(find_client(name)))

def find_clients_size():

    return getsizeof(str(find_clients()))
