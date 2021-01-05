from back.sked.clock import *

from back.sked.tasks.indicators import update_indicators

def start_tasks():

    set_interval(update_indicators, every_month * 3)
