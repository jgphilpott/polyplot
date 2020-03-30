from os import environ
from pymongo import MongoClient

def find_client():

    return MongoClient(environ["MONGO_PORT_27017_TCP_ADDR"], 27017)
