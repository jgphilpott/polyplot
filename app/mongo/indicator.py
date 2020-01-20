from os import getcwd
from json import load

def get_indicator():
    pass

def get_indicators():

    cwd = getcwd() + "/app/mongo"

    with open(cwd + "/data/indicators.json") as list:
        indicators = load(list)

    return indicators
