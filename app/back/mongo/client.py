from pymongo import MongoClient
from os import environ

client = MongoClient(environ["MONGO_PORT_27017_TCP_ADDR"], 27017)

database = client.iGraph

def get_client(log=False):

    if log:

        print("\n\033[93mThe mongo client:\033[0m\n\n{}\n".format(str(client)))

    else:

        return client
