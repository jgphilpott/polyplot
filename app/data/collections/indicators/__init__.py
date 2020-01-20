from os import getcwd
from json import load
from requests import get

def get_indicators():

    pwd = getcwd() + "/app/data/collections/indicators"

    with open(pwd + "/list.json") as list:
        indicators = load(list)

    return indicators

def collect_indicator(collection, indicator):

    api = "http://api.worldbank.org/v2/country/all/indicator/{}?format=json".format(indicator["code"])
    meta = get(api).json()

    page = 1
    pages = meta[0]["pages"]
    items = []

    while page <= pages:

        url = api + "&page=" + str(page)
        data = get(url).json()[1]

        for item in data:

            region_exists = [region for region in items if region["code"] in [item["countryiso3code"]]]
            obj = {"year": int(item["date"]), "value": item["value"]}

            if region_exists:
                region_exists[0]["history"].append(obj)
            else:
                items.append({"code": item["countryiso3code"], "history": [obj]})

        page += 1

    collection.insert_many(items)
