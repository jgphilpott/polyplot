from requests import get
from datetime import datetime

class Indicator():

    def __init__(self, indicator):

        self.code = indicator["code"]
        self.name = indicator["name"]

        self.default = indicator["default"]
        self.featured = indicator["featured"]

        self.categories = indicator["categories"]

        self.completeness = indicator["completeness"]
        self.size = indicator["size"]

        if "countries" in indicator:
            self.countries = indicator["countries"]
        else:
            self.countries = []

        if "last_updated" in indicator:
            self.last_updated = indicator["last_updated"]
        else:
            self.last_updated = None

    def calculate_completeness(self):

        total_data = 0
        total_count = 0

        for country in self.countries:

            data = 0
            count = 0

            for date in country["history"]:

                count += 1
                total_count += 1

                if type(date["value"]) == int or type(date["value"]) == float:

                    data += 1
                    total_data += 1

            country["completeness"] = (data / count) * 100

        self.completeness = (total_data / total_count) * 100

        return self

    def calculate_size(self):

        size = 0

        for country in self.countries:

            country["size"] = len(str(country["history"]).encode("utf-8"))
            size += country["size"]

        self.size = size

        return self

    def update(self):

        try:

            api = "https://api.worldbank.org/v2/country/all/indicator/"
            meta = get("{}{}?format=json&per_page=1".format(api, self.code)).json()[0]

            if not self.last_updated or datetime.strptime(meta["lastupdated"], "%Y-%m-%d") >= datetime.strptime(self.last_updated, "%Y-%m-%d"):

                data = get("{}{}?format=json&per_page={}".format(api, self.code, meta["total"])).json()[1]

                countries = []
                country_codes = get("https://gist.githubusercontent.com/jgphilpott/a1366c890935e615f87a6843b72f541a/raw/8438cfa30979586354ceacd8579678b5da91522f/countryCodes.js").json()

                for item in data:

                    if item["countryiso3code"] in country_codes:

                        obj = {"year": int(item["date"]), "value": item["value"]}
                        country_exists = [country for country in countries if country["code"] in [item["countryiso3code"]]]

                        if country_exists:

                            country_exists[0]["history"].append(obj)

                        else:

                            countries.append({"code": item["countryiso3code"], "name": item["country"]["value"], "history": [obj]})

                self.countries = countries
                self.last_updated = datetime.utcnow().strftime("%Y-%m-%d")
                self.calculate_completeness()
                self.calculate_size()

        except:

            pass

        return self
