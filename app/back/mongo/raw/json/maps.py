from requests import get
from pprint import pprint
from bs4 import BeautifulSoup
from json import dump

maps = []

large = get("https://raw.githubusercontent.com/AshKyd/geojson-regions/master/countries/10m/all.geojson")
medium = get("https://raw.githubusercontent.com/AshKyd/geojson-regions/master/countries/50m/all.geojson")
small = get("https://raw.githubusercontent.com/AshKyd/geojson-regions/master/countries/110m/all.geojson")

for item in large.json()['features']:
    maps.append({"code": item["properties"]["ADM0_A3"],
                 "name": item["properties"]["NAME"],
                 "coordinates": {"small": None,
                                 "medium": None,
                                 "large": item["geometry"]["coordinates"][0]}
                                })

for item in medium.json()['features']:
    obj = [obj for obj in maps if obj["code"] == item["properties"]["adm0_a3"]]
    obj[0]["coordinates"]["medium"] = item["geometry"]["coordinates"][0]

for item in small.json()['features']:
    obj = [obj for obj in maps if obj["code"] == item["properties"]["adm0_a3"]]
    obj[0]["coordinates"]["small"] = item["geometry"]["coordinates"][0]

maps = sorted(maps, key=lambda key: key['code'] )

with open("output.json", "w") as output:
    dump(maps, output, indent=2, sort_keys=True)
