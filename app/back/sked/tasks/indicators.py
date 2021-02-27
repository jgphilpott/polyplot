from time import sleep

from back.mongo.data.collect.indicators.mongo import Indicator, find_indicators, update_indicator

def update_indicators():

    for indicator in find_indicators():

        update_indicator(Indicator(indicator).update().__dict__)

        sleep(60)
