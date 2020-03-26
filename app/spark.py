from fire import Fire

from back.mongo.client import find_client

from back.mongo.data.base import find_database, drop_database

from back.mongo.data.collect.ions import find_collection, find_collections, drop_collection

from back.mongo.data.collect.countries.mongo import find_country, find_countries

from back.mongo.data.collect.indicators.mongo import find_indicator, find_indicators, update_indicator, update_indicators

from back.settings.compile import compile_sass

from requests import get
from bs4 import BeautifulSoup
import json

featured = get("https://data.worldbank.org/indicator?tab=featured")
html = BeautifulSoup(featured.text, "html.parser").select('.overviewArea')[0]
cats = html.select(".nav-item")

with open('indicators.json') as json_file:
    indicators = json.load(json_file)

featuredCodes = []

for cat in cats:
    itms = cat.select("li")
    for itm in itms:
        featuredCodes.append(itm.a.get("href")[11:].split("?")[0])

for indicator in indicators:

    if indicator["code"] in featuredCodes:
        indicator["featured"] = True
    else:
        indicator["featured"] = False

    print(indicator)

with open('output.json', "w") as json_file:
    json.dump(indicators, json_file, indent=2, sort_keys=True)

Fire()
