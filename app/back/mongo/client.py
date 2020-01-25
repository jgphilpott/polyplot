from os import environ
from pymongo import MongoClient

client = MongoClient(environ["MONGO_PORT_27017_TCP_ADDR"], 27017)

def find_client(log=False):

    if log:

        print("\n\033[93mThe mongo client:\033[0m\n\n{}\n".format(client))

    else:

        return client
