from back.mongo.data.base import find_database

database = find_database()

def find_collection(code):

    return database[code]

def find_collections():

    return database.list_collection_names()

def drop_collection(code):

    return find_collection(code).drop()
