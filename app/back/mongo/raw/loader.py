from os import getcwd
from json import load
from back.mongo.data.base import find_database
from back.mongo.data.collect.ions import find_collections

cwd = getcwd() + "/app/back/mongo/raw"

database = find_database()
collections = find_collections()

def load_json():

    path = cwd + "/json"

    if "indexes" not in collections:

        collection = database["indexes"]

        with open(cwd + "/indexes.json") as list:

            indexes = load(list)

        print(indexes)
        collection.insert_many(indexes)

def load_data():

    load_json()
