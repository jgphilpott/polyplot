from time import sleep

from back.mongo.data.collect.indicators.mongo import Indicator, find_indicator, find_indicators, update_indicator

def update_indicators():

    for indicator in find_indicators({}, {"_id": 0, "code": 1}):

        update_indicator(Indicator(find_indicator({"code": indicator["code"]})).update().__dict__)

        sleep(60)
