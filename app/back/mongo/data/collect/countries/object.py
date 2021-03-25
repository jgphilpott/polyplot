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

        self.min_year = country["min_year"] if "min_year" in country else None
        self.max_year = country["max_year"] if "max_year" in country else None

        self.indicators = country["indicators"] if "indicators" in country else {}
        self.last_updated = country["last_updated"] if "last_updated" in country else None

    def update(self):

        try:

            time_range = []

            query= {"countries": {"$exists": True, "$ne": []}, "completeness": {"$gt": 0}}
            filter = {"_id": 0, "code": 1, "name": 1, "categories": 1, "min_year": 1, "max_year": 1, "min_value": 1, "max_value": 1, "size": 1, "completeness": 1, "countries": {"$elemMatch": {"code": self.code}}}

            for indicator in find_indicators(query, filter):

                del indicator["countries"][0]["code"]
                del indicator["countries"][0]["factbook"]
                del indicator["countries"][0]["formal_name"]
                del indicator["countries"][0]["name"]
                del indicator["countries"][0]["region"]
                del indicator["countries"][0]["wiki"]

                indicator["countries"][0]["code"] = indicator["code"]
                indicator["countries"][0]["name"] = indicator["name"]
                indicator["countries"][0]["categories"] = indicator["categories"]

                years = [item["year"] for item in indicator["countries"][0]["history"] if isinstance(item["year"], Number)]
                values = [item["value"] for item in indicator["countries"][0]["history"] if isinstance(item["value"], Number)]

                indicator["countries"][0]["min_year"] = min(years) if years else None
                indicator["countries"][0]["max_year"] = max(years) if years else None

                indicator["countries"][0]["min_value"] = min(values) if values else None
                indicator["countries"][0]["max_value"] = max(values) if values else None

                indicator["countries"][0]["min_year_total"] = indicator["min_year"]
                indicator["countries"][0]["max_year_total"] = indicator["max_year"]

                if type(indicator["min_year"]) == int: time_range.append(indicator["min_year"])
                if type(indicator["max_year"]) == int: time_range.append(indicator["max_year"])

                indicator["countries"][0]["min_value_total"] = indicator["min_value"]
                indicator["countries"][0]["max_value_total"] = indicator["max_value"]

                indicator["countries"][0]["size_total"] = indicator["size"]
                indicator["countries"][0]["completeness_total"] = indicator["completeness"]

                self.indicators[indicator["code"].replace(".", "-")] = indicator["countries"][0]

            self.min_year = min(time_range)
            self.max_year = max(time_range)

            self.last_updated = datetime.utcnow().strftime("%Y-%m-%d")

        except:

            pass

        return self
