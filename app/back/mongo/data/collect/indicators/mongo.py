from pprint import pprint as pp
from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.indicators.object import Indicator

indicators = find_collection("indicators")

def find_indicator(indicator, log=False):

    code = indicator

    if log:

        indicator = indicators.find_one({"code": code}, {"_id": 0, "geographies": 0})

        if indicator:

            print("\n\033[93mIndicator:\033[0m {}\n".format(code))
            pp(indicator)
            print("")

        else:

            print("\n\033[93mIndicator\033[0m {} \033[93mnot found.\033[0m\n".format(code))

    else:

        return indicators.find_one({"code": code}, {"_id": 0})

def find_indicators(log=False):

    if log:

        print("\n\033[93mThere are a total of {} indicators.\033[0m\n".format(indicators.count()))

        count = 1

        for indicator in indicators.find({}, {"_id": 0}):

            print("\033[93mIndicator #{}:\033[0m {} \033[93m~\033[0m {}".format(count, indicator["code"], indicator["name"]))
            count += 1

        print("")

    else:

        return indicators.find({}, {"_id": 0})

def update_indicator(indicator, log=False):

    code = indicator
    indicator = find_indicator(code)
    indicator = Indicator(indicator)

    if log:

        indicator.update(log)

    else:

        indicator.update()

    indicators.update_one({"code": indicator.code}, {"$set": indicator.__dict__})

def update_indicators(log=False):

    for indicator in find_indicators():

        if log:

            update_indicator(indicator["code"], log=log)

        else:

            update_indicator(indicator["code"])
