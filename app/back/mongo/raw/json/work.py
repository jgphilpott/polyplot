from requests import get
from json import dump

maps = []

large = get("https://raw.githubusercontent.com/AshKyd/geojson-regions/master/countries/10m/all.geojson")
medium = get("https://raw.githubusercontent.com/AshKyd/geojson-regions/master/countries/50m/all.geojson")
small = get("https://raw.githubusercontent.com/AshKyd/geojson-regions/master/countries/110m/all.geojson")

large.json()['features'] = sorted(large.json()['features'], key=lambda key: key["properties"]["ADM0_A3"])

for item in large.json()['features']:

    feat = {"type": "Feature", "geometry": item["geometry"], "properties": {"code": item["properties"]["ADM0_A3"], "name": item["properties"]["NAME"]}}

    maps.append({"code": item["properties"]["ADM0_A3"],
                 "name": item["properties"]["NAME"],
                 "detail": {"small": None,
                            "medium": None,
                            "large": feat}})

for item in medium.json()['features']:

    obj = [obj for obj in maps if obj["code"] == item["properties"]["adm0_a3"]]
    obj[0]["detail"]["medium"] = {"type": "Feature", "geometry": item["geometry"], "properties": {"code": item["properties"]["adm0_a3"], "name": item["properties"]["name"]}}

for item in small.json()['features']:

    obj = [obj for obj in maps if obj["code"] == item["properties"]["adm0_a3"]]
    obj[0]["detail"]["small"] = {"type": "Feature", "geometry": item["geometry"], "properties": {"code": item["properties"]["adm0_a3"], "name": item["properties"]["name"]}}

with open("output.json", "w") as output:

    dump(maps, output, indent=2, sort_keys=True)
