from tqdm import tqdm
from requests import get

from app.mongo.database import get_database
from app.mongo.indicator import get_indicators

database = get_database()

def get_collection(collection, log=False):

    code = str(collection)
    collection = database[code]

    if log:

        if collection.count():

            print("\n\033[93mCollection:\033[0m {}\n\n{}\n".format((str(code)), str(collection)))

        else:

            print("\n\033[91mCollection\033[0m {} \033[91mnot found.\033[0m\n".format((str(code))))

    else:

        return collection

def get_collections(log=False):

    collections = database.list_collection_names()

    if log:

        total = len(collections)
        print("\n\033[93mThere are a total of {} collections.\033[0m\n".format(str(total)))
        count = 0

        if total > 0:

            for collection in collections:

                count += 1
                print("\033[93mCollection #{}:\033[0m {}".format(str(count), str(collection)))

            print()

    else:

        return collections

def collect_indicator(indicator, log=False):

    collection = database[indicator["code"]]

    api = "https://api.worldbank.org/v2/country/all/indicator/{}?format=json".format(indicator["code"])
    meta = get(api).json()

    page = 1
    pages = meta[0]["pages"]

    items = []

    if log:

        print("\033[93m Collecting:\033[0m {}".format(indicator["code"]))
        bar = tqdm(initial=page, total=pages)

    while page <= pages:

        url = api + "&page=" + str(page)
        data = get(url).json()[1]

        for item in data:

            obj_exists = [obj for obj in items if obj["code"] in [item["countryiso3code"]]]
            obj = {"year": int(item["date"]), "value": item["value"]}

            if obj_exists:
                obj_exists[0]["history"].append(obj)
            else:
                items.append({"code": item["countryiso3code"], "history": [obj]})

        bar.update(1)
        page += 1

    collection.insert_many(items)

def collect_indicators(log=False):

    collections = get_collections()
    indicators = get_indicators()

    if log:

        print("\n\033[93m There are a total of {} indicators.\033[0m\n".format(len(indicators)))

    if indicators:

        for indicator in indicators:

            if indicator["code"] not in collections:

                try:

                    if log:

                        collect_indicator(indicator, log=True)

                    else:

                        collect_indicator(indicator)

                except:

                    if log:

                        print("\033[91m Error collecting indicator: \033[0m{}".format(indicator["code"]))

            else:

                if log:

                    print("\033[93m Indicator\033[0m {} \033[93malready exists.\033[0m".format(indicator["code"]))

        print()

def drop_collection(collection, log=False):

    if log:

        print("\n\033[91mWarning! Are you sure you want to drop the collection:\033[0m {}\n".format(str(collection)))

        while True:

            reply = str(input("\033[93my or n:\033[0m ")).lower()

            if reply == "y":

                get_collection(str(collection)).drop()
                print("\n\033[93mOkay, the collection\033[0m {} \033[93mhas been droped!\033[0m\n".format(str(collection)))
                break

            elif reply == "n":

                print()
                break

    else:

        return get_collection(str(collection)).drop()
