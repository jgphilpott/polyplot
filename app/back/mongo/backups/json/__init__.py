from json import load

from back.mongo.data.collect.ions import find_collection, find_collections
from back.mongo.data.collect.countries.mongo import Country, find_countries, update_country
from back.mongo.data.collect.indicators.mongo import Indicator, find_indicators, update_indicator

collections = find_collections()

def load_json(path):

    path = "/root/app/back/mongo/backups/json"

    lakes = ["lakes_massive", "lakes_huge", "lakes_large", "lakes_medium", "lakes_small", "lakes_tiny", "lakes_micro"]
    maps = ["maps_massive", "maps_huge", "maps_large", "maps_medium", "maps_small", "maps_tiny", "maps_micro"]
    railroads = ["railroads_massive", "railroads_huge", "railroads_large", "railroads_medium", "railroads_small", "railroads_tiny", "railroads_micro"]
    rivers = ["rivers_massive", "rivers_huge", "rivers_large", "rivers_medium", "rivers_small", "rivers_tiny", "rivers_micro"]
    roads = ["roads_massive", "roads_huge", "roads_large", "roads_medium", "roads_small", "roads_tiny", "roads_micro"]

    datasets = ["airports", "cities", "clients", "countries", "graticules", "indicators", *lakes, *maps, "metas", "ports", *railroads, *rivers, *roads]

    for dataset in datasets:

        if dataset not in collections:

            collection = find_collection(dataset)

            with open(path + "/" + dataset.split("_")[0] + "/" + dataset + ".json", "r") as list:

                collection.insert_many(load(list))

    for indicator in find_indicators():

        if indicator["default"] == True and "last_updated" not in indicator:

            update_indicator(Indicator(indicator).update().__dict__)

    for country in find_countries():

        if "last_updated" not in country:

            update_country(Country(country).update().__dict__)
