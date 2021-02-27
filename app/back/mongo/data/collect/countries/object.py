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

            for indicator in find_indicators({"countries": {"$exists": True, "$ne": []}}, {"_id": 0, "code": 1, "name": 1, "categories": 1, "min_year": 1, "max_year": 1, "min_value": 1, "max_value": 1, "size": 1, "completeness": 1, "countries": {"$elemMatch": {"code": self.code}}}):

                del indicator["countries"][0]["code"]
                del indicator["countries"][0]["name"]
                del indicator["countries"][0]["formal_name"]
                del indicator["countries"][0]["region"]
                del indicator["countries"][0]["factbook"]
                del indicator["countries"][0]["wiki"]

                indicator["countries"][0]["code"] = indicator["code"]
                indicator["countries"][0]["name"] = indicator["name"]
                indicator["countries"][0]["categories"] = indicator["categories"]

                indicator["countries"][0]["size_total"] = indicator["size"]
                indicator["countries"][0]["completeness_total"] = indicator["completeness"]

                years = [item["year"] for item in indicator["countries"][0]["history"] if isinstance(item["year"], Number)]
                values = [item["value"] for item in indicator["countries"][0]["history"] if isinstance(item["value"], Number)]

                indicator["countries"][0]["min_year"] = min(years) if years else None
                indicator["countries"][0]["max_year"] = max(years) if years else None

                indicator["countries"][0]["min_value"] = min(values) if values else None
                indicator["countries"][0]["max_value"] = max(values) if values else None

                indicator["countries"][0]["min_year_total"] = indicator["min_year"]
                indicator["countries"][0]["max_year_total"] = indicator["max_year"]

                indicator["countries"][0]["min_value_total"] = indicator["min_value"]
                indicator["countries"][0]["max_value_total"] = indicator["max_value"]

                self.indicators[indicator["code"].replace(".", "-")] = indicator["countries"][0]

            self.last_updated = datetime.utcnow().strftime("%Y-%m-%d")

        except:

            pass

        return self
