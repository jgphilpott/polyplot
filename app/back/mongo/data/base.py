from back.mongo.client import find_client

client = find_client()
database = client.polyplot

def find_database():

    return database

def drop_database():

    return client.drop_database(database)
