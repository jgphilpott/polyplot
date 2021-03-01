from back.sked.clock import *

from back.sked.tasks.countries import update_countries
from back.sked.tasks.indicators import update_indicators

def start_tasks():

    Timer(week, Interval, (update_countries, month * 3)).start()
    Interval(update_indicators, month * 3)
