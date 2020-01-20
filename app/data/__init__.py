from data.collections import init_db
from pymongo import MongoClient
from os import environ

client = MongoClient(environ["MONGO_PORT_27017_TCP_ADDR"], 27017)

iGraph = client.iGraph

init_db(iGraph)
