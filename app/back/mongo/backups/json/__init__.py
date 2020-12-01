from json import load

from back.mongo.data.collect.ions import find_collection, find_collections
from back.mongo.data.collect.indicators.mongo import Indicator, find_indicators, update_indicator

collections = find_collections()

def load_json(path):

    path = "/root/app/back/mongo/backups/json"

    datasets = ["airports", "clients", "countries", "indicators", "maps", "meta"]

    for dataset in datasets:

        if dataset not in collections:

            collection = find_collection(dataset)
            file = path + "/" + dataset + ".json"

            with open(file) as list:

                data = load(list)
                collection.insert_many(data)

    for indicator in find_indicators({}, {"_id": 0}):

        if indicator["default"] == True:

            update_indicator(Indicator(indicator).update().__dict__)
