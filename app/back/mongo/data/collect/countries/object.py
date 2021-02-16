from numbers import Number
from datetime import datetime

from back.mongo.data.collect.indicators.mongo import find_indicators

class Country():

    def __init__(self, country):

        self.centroid = country["centroid"]
        self.code = country["code"]
        self.description = country["description"]
        self.factbook = country["factbook"]
        self.formal_name = country["formal_name"]
        self.name = country["name"]
        self.region = country["region"]
        self.wiki = country["wiki"]

        self.indicators = country["indicators"] if "indicators" in country else {}
        self.last_updated = country["last_updated"] if "last_updated" in country else None

    def update(self):

        try:

            for indicator in find_indicators({"countries": {"$exists": True, "$ne": []}}):

                for country in indicator["countries"]:

                    if country["code"] == self.code:

                        del country["code"]
                        del country["name"]
                        del country["region"]

                        country["size_total"] = indicator["size"]
                        country["completeness_total"] = indicator["completeness"]

                        country["code"] = indicator["code"]
                        country["name"] = indicator["name"]
                        country["categories"] = indicator["categories"]

                        years = [item["year"] for item in country["history"] if isinstance(item["year"], Number)]
                        values = [item["value"] for item in country["history"] if isinstance(item["value"], Number)]

                        country["min_year"] = min(years) if years else None
                        country["max_year"] = max(years) if years else None

                        country["min_value"] = min(values) if values else None
                        country["max_value"] = max(values) if values else None

                        country["min_year_total"] = indicator["min_year"]
                        country["max_year_total"] = indicator["max_year"]

                        country["min_value_total"] = indicator["min_value"]
                        country["max_value_total"] = indicator["max_value"]

                        self.indicators[indicator["code"].replace(".", "-")] = country

                        break

            self.last_updated = datetime.utcnow().strftime("%Y-%m-%d")

        except:

            pass

        return self
