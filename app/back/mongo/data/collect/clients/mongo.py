from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.clients.object import Client

collection = find_collection("clients")

def new_client(client):

    return str(collection.insert_one(client).inserted_id)

def new_clients(clients):

    return str(collection.insert_many(clients).inserted_ids)

def find_client(query={}, filter={"_id": 0}):

    return dict(collection.find_one(query, filter))

def find_clients(query={}, filter={"_id": 0}, sort=[("email", 1)]):

    return list(collection.find(query, filter).sort(sort))

def update_client(client):

    return collection.update_one({"email": client["email"]}, {"$set": client})

def update_clients():

    for client in find_clients():

        update_client(client)

def valid_client(id):

    try:

        return find_client({"id": id}, {"_id": 0, "id": 0, "password": 0})

    except:

        return None
