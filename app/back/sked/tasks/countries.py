from time import sleep

from back.mongo.data.collect.countries.mongo import Country, find_country, find_countries, update_country

def update_countries():

    for country in find_countries({}, {"_id": 0, "code": 1}):

        update_country(Country(find_country({"code": country["code"]})).update().__dict__)

        sleep(60)
