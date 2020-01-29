from pprint import pprint as pp
from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.countries.object import Country

countries = find_collection("countries")

def find_country(country, log=False):

    pass

def find_countries(log=False):

    if log:

        print("\n\033[93mThere are a total of {} countries.\033[0m\n".format(countries.count()))

        count = 1

        for country in countries.find({}, {"_id": 0}):

            print("\033[93mCountry #{}:\033[0m {} \033[93m~\033[0m {}".format(count, country["code"], country["name"]))
            count += 1

        print("")

    else:

        return countries.find({}, {"_id": 0})
