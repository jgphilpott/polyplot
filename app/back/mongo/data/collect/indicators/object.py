from requests import get
from datetime import datetime

class Indicator():

    def __init__(self, indicator):

        self.code = indicator["code"]
        self.name = indicator["name"]

        self.default = indicator["default"]
        self.featured = indicator["featured"]

        self.categories = indicator["categories"]

        self.description = indicator["description"]
        self.limitations = indicator["limitations"]
        self.methodology = indicator["methodology"]
        self.relevance = indicator["relevance"]

        self.countries = indicator["countries"] if "countries" in indicator else []

        self.min_year = indicator["min_year"] if "min_year" in indicator else None
        self.max_year = indicator["max_year"] if "max_year" in indicator else None

        self.min_value = indicator["min_value"] if "min_value" in indicator else None
        self.max_value = indicator["max_value"] if "max_value" in indicator else None

        self.last_updated = indicator["last_updated"] if "last_updated" in indicator else None

        self.completeness = indicator["completeness"]
        self.size = indicator["size"]

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

            if not self.last_updated or datetime.strptime(meta["lastupdated"], "%Y-%m-%d") > datetime.strptime(self.last_updated, "%Y-%m-%d"):

                data = get("{}{}?format=json&per_page={}".format(api, self.code, meta["total"])).json()[1]
                country_codes = get("https://gist.githubusercontent.com/jgphilpott/a1366c890935e615f87a6843b72f541a/raw/5d67a813152060738513a77b363720c5fc76dbe9/countryCodes.js").json()

                for item in data:

                    if item["countryiso3code"] in country_codes:

                        if int(item["date"]):

                            if not self.min_year: self.min_year = int(item["date"])
                            if not self.max_year: self.max_year = int(item["date"])

                            if int(item["date"]) < self.min_year: self.min_year = int(item["date"])
                            if int(item["date"]) > self.max_year: self.max_year = int(item["date"])

                        if item["value"]:

                            if not self.min_value: self.min_value = item["value"]
                            if not self.max_value: self.max_value = item["value"]

                            if item["value"] < self.min_value: self.min_value = item["value"]
                            if item["value"] > self.max_value: self.max_value = item["value"]

                        obj = {"year": int(item["date"]), "value": item["value"]}
                        country_exists = [country for country in self.countries if country["code"] in [item["countryiso3code"]]]

                        if country_exists:

                            country_exists[0]["history"].append(obj)

                        else:

                            self.countries.append({"code": item["countryiso3code"], "region": country_codes[item["countryiso3code"]], "name": item["country"]["value"], "history": [obj]})

                self.last_updated = datetime.utcnow().strftime("%Y-%m-%d")
                self.calculate_completeness()
                self.calculate_size()

        except:

            pass

        return self
