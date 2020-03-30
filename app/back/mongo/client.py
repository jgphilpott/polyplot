from os import environ
from pymongo import MongoClient

client = MongoClient(environ["MONGO_PORT_27017_TCP_ADDR"], 27017)

def find_client(log=False):

    return client
