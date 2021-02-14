from threading import Timer
from back.sked.clock import *

from back.sked.tasks.countries import update_countries
from back.sked.tasks.indicators import update_indicators

def start_tasks():

    Timer(week, set_interval, (update_countries, month * 3)).start()
    set_interval(update_indicators, month * 3)
