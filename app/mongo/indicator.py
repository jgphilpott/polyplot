from os import getcwd
from json import load

from pprint import pprint as pp

def get_indicator(code, log=False):

    indicators = get_indicators()
    indicator = [obj for obj in indicators if obj["code"] in [code]]

    if indicator:

        if log:

            print("\n\033[93mFound indicator:\033[0m {}\n".format(indicator[0]["code"]))
            pp(indicator[0])
            print()

        else:

            return indicator[0]


def get_indicators(log=False):

    cwd = getcwd() + "/app/mongo"

    with open(cwd + "/data/indicators.json") as list:
        indicators = load(list)

    if log:

        print("\n\033[93mThere are a total of {} indicators.\033[0m".format(len(indicators)))
        count = 0

        for indicator in indicators:

            count += 1
            print("\n\033[93mIndicator #{}:\033[0m".format(count))
            pp(indicator)

        print()

    else:

        return indicators
