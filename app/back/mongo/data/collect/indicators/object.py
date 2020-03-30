from requests import get

class Indicator():

    def __init__(self, indicator):

        self.code = indicator["code"]
        self.name = indicator["name"]

        self.default = indicator["default"]
        self.featured = indicator["featured"]

        self.categories = indicator["categories"]

        if "geographies" in indicator:

            self.geographies = indicator["geographies"]

        else:

            self.geographies = []

    def update(self):

        if not self.geographies:

            try:

                api = "https://api.worldbank.org/v2/country/all/indicator/"
                meta = get("{}{}?format=json".format(api, self.code)).json()[0]
                data = get("{}{}?format=json&per_page={}".format(api, self.code, meta["total"])).json()[1]

                geos = []

                for item in data:

                    if item["value"]:

                        obj = {"year": int(item["date"]), "value": item["value"]}
                        geo_exists = [geo for geo in geos if geo["code"] in [item["countryiso3code"]]]

                        if geo_exists:

                            geo_exists[0]["history"].append(obj)

                        else:

                            geos.append({"code": item["countryiso3code"], "history": [obj]})

                self.geographies = geos

            except:

                pass
