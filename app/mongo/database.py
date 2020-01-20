from pymongo import MongoClient
from os import environ

client = MongoClient(environ["MONGO_PORT_27017_TCP_ADDR"], 27017)

database = client.iGraph

def get_client():
    return client

def get_database():
    return database

def drop_database():
    return client.drop_database(database)
