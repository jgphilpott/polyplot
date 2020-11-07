from back.mongo.client import mongo_client

client = mongo_client()
database = client.polyplot

def find_database():

    return database

def drop_database():

    return client.drop_database(database)
