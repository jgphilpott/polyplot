from json import load

from back.mongo.data.collect.ions import find_collection, find_collections
from back.mongo.data.collect.indicators.mongo import update_indicator

collections = find_collections()

def load_json(path):

    path = "/root/app/back/mongo/backups/json"

    if "countries" not in collections:

        collection = find_collection("countries")
        file = path + "/countries.json"

        with open(file) as list:

            countries = load(list)
            collection.insert_many(countries)

    if "indicators" not in collections:

        collection = find_collection("indicators")
        file = path + "/indicators.json"

        with open(file) as list:

            indicators = load(list)
            collection.insert_many(indicators)

        for indicator in indicators:

            if indicator["default"] == True:

                update_indicator(indicator["code"])

    if "maps" not in collections:

        collection = find_collection("maps")
        file = path + "/maps.json"

        with open(file) as list:

            maps = load(list)
            collection.insert_many(maps)
