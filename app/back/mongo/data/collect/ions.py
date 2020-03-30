from back.mongo.data.base import find_database

database = find_database()
collections = database.list_collection_names()

def find_collection(code):

    collection = database[code]

    return collection

def find_collections():

    return collections

def drop_collection(code):

    collection = find_collection(code)

    return collection.drop()
