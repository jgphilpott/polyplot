from tqdm import tqdm
from requests import get

class Index():

    def __init__(self, index):

        self.category = index["category"]
        self.index = index["index"]
        self.code = index["code"]

        if "geographies" in index:

            self.geographies = index["geographies"]

        else:

            self.geographies = None

    def update(self, log=False):

        if not self.geographies:

            try:

                api = "https://api.worldbank.org/v2/country/all/indicator/{}?format=json".format(self.code)
                meta = get(api).json()[0]

                page = 1
                pages = meta["pages"]

                geos = []

                if log:

                    print("\n\033[93mUpdating index:\033[0m {} \033[93m~\033[0m {}".format(self.code, self.index))
                    bar = tqdm(initial=page, total=pages)

                while page <= pages:

                    url = api + "&page=" + str(page)
                    data = get(url).json()[1]

                    for item in data:

                        geo_exists = [geo for geo in geos if geo["code"] in [item["countryiso3code"]]]
                        obj = {"year": int(item["date"]), "value": item["value"]}

                        if geo_exists:

                            geo_exists[0]["history"].append(obj)

                        else:

                            geos.append({"code": item["countryiso3code"], "history": [obj]})

                    bar.update(1)
                    page += 1

                self.geographies = geos

            except:

                print("\033[91mError updating index\033[0m {}".format(self.code))

        else:

            print("\033[93mIndex\033[0m {} \033[93mis already up to date.\033[0m".format(self.code))

        print()
