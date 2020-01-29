from os import getcwd
from json import load

from back.mongo.data.base import find_database
from back.mongo.data.collect.ions import find_collections

database = find_database()
collections = find_collections()

def load_json(path):

    path = path + "/json"

    if "indexes" not in collections:

        collection = database["indexes"]

        with open(path + "/indexes.json") as list:

            indexes = load(list)

        collection.insert_many(indexes)

    if "countries" not in collections:

        collection = database["countries"]

        with open(path + "/countries.json") as list:

            countries = load(list)

        collection.insert_many(countries)

def load_data():

    path = getcwd() + "/app/back/mongo/raw"

    load_json(path)
