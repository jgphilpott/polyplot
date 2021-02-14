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

                        country["indicator"] = indicator["name"]
                        country["categories"] = indicator["categories"]

                        self.indicators[indicator["code"].replace(".", "-")] = country

                        break

            self.last_updated = datetime.utcnow().strftime("%Y-%m-%d")

        except:

            pass

        return self
