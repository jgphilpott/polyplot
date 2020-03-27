from os import getcwd
from json import load

from back.mongo.data.base import find_database
from back.mongo.data.collect.ions import find_collections
from back.mongo.data.collect.indicators.mongo import update_indicator

database = find_database()
collections = find_collections()

def load_json(path):

    path = path + "/json"

    if "indicators" not in collections:

        collection = database["indicators"]

        with open(path + "/indicators.json") as list:

            indicators = load(list)

            for indicator in indicators:

                collection.insert(indicator)

                if indicator["default"] == True:

                    update_indicator(indicator["code"])

    if "countries" not in collections:

        collection = database["countries"]

        with open(path + "/countries.json") as list:

            countries = load(list)

        collection.insert_many(countries)

def load_data():

    path = getcwd() + "/app/back/mongo/raw"

    load_json(path)
