from os import getcwd
from json import load

def get_indicator(code, log=False):

    indicators = get_indicators()
    indicator = [obj for obj in indicators if obj["code"] in [str(code)]]

    if indicator:

        if log:

            print("\n\033[93mFound indicator:\033[0m {}\n\n{}\n".format(str(indicator[0]["code"]), str(indicator[0])))

        else:

            return indicator[0]

    else:

        print("\n\033[91mIndicator\033[0m {} \033[91mnot found.\033[0m\n".format(str(code)))

def get_indicators(log=False):

    cwd = getcwd() + "/app/mongo"

    with open(cwd + "/data/indicators.json") as list:

        indicators = load(list)

    if log:

        print("\n\033[93mThere are a total of {} indicators.\033[0m".format(len(indicators)))
        count = 0

        for indicator in indicators:

            count += 1
            print("\n\033[93mIndicator #{}:\033[0m\n{}".format(str(count), str(indicator)))

        print()

    else:

        return indicators
