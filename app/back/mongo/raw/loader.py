from json import load

from os import remove, rmdir
from os.path import exists

from back.mongo.data.base import find_database
from back.mongo.data.collect.ions import find_collections
from back.mongo.data.collect.indicators.mongo import update_indicator

database = find_database()
collections = find_collections()

def load_json(path):

    path = path + "/json"

    if "indicators" not in collections:

        collection = database["indicators"]
        file = path + "/indicators.json"

        with open(file) as list:

            indicators = load(list)
            collection.insert_many(indicators)

        for indicator in indicators:

            if indicator["default"] == True:

                update_indicator(indicator["code"])

        remove(file)

    if "countries" not in collections:

        collection = database["countries"]
        file = path + "/countries.json"

        with open(file) as list:

            countries = load(list)
            collection.insert_many(countries)

        remove(file)

    if "maps" not in collections:

        collection = database["maps"]
        file = path + "/maps.json"

        with open(file) as list:

            maps = load(list)
            collection.insert_many(maps)

        remove(file)

    if exists(path): rmdir(path)

def load_data():

    path = "/root/app/back/mongo/raw"

    load_json(path)
