import json
from requests import get

class Indicator():

    def __init__(self, indicator):

        self.code = indicator["code"]
        self.name = indicator["name"]

        self.default = indicator["default"]
        self.featured = indicator["featured"]

        self.categories = indicator["categories"]

        if "completeness" in indicator:
            self.completeness = indicator["completeness"]
        else:
            self.completeness = 0

        if "size" in indicator:
            self.size = indicator["size"]
        else:
            self.size = 0

        if "geographies" in indicator:
            self.geographies = indicator["geographies"]
        else:
            self.geographies = []

    def calculate_completeness(self, country_codes):

        total_data = 0
        total_count = 0

        for geography in self.geographies:

            if geography["code"] in country_codes:

                data = 0
                count = 0

                for date in geography["history"]:

                    count += 1
                    total_count += 1

                    dataType = type(date["value"])

                    if dataType == int or dataType == float:

                        data += 1
                        total_data += 1

                geography["completeness"] = (data / count) * 100

        self.completeness = (total_data / total_count) * 100

        return self

    def calculate_size(self, country_codes):

        size = 0

        for geography in self.geographies:

            if geography["code"] in country_codes:

                geography["size"] = len(str(geography["history"]).encode("utf-8"))
                size += geography["size"]

        self.size = size

        return self

    def update(self):

        if not self.geographies:

            try:

                api = "https://api.worldbank.org/v2/country/all/indicator/"
                meta = get("{}{}?format=json".format(api, self.code)).json()[0]
                data = get("{}{}?format=json&per_page={}".format(api, self.code, meta["total"])).json()[1]

                geos = []

                for item in data:

                    obj = {"year": int(item["date"]), "value": item["value"]}
                    geo_exists = [geo for geo in geos if geo["code"] in [item["countryiso3code"]]]

                    if geo_exists:

                        geo_exists[0]["history"].append(obj)

                    else:

                        geos.append({"code": item["countryiso3code"], "name": item["country"]["value"], "history": [obj]})

                self.geographies = geos

            except:

                pass

        if self.geographies:

            try:

                country_codes = json.loads(get("https://gist.githubusercontent.com/jgphilpott/a1366c890935e615f87a6843b72f541a/raw/8438cfa30979586354ceacd8579678b5da91522f/countryCodes.js").content.decode("utf-8"))

                self.calculate_completeness(country_codes)
                self.calculate_size(country_codes)

            except:

                pass

        return self
