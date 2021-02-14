from time import sleep

from back.mongo.data.collect.countries.mongo import Country, find_countries, update_country

def update_countries():

    for country in find_countries():

        update_country(Country(country).update().__dict__)

        sleep(60)
