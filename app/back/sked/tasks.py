from time import sleep
from threading import Timer
from datetime.datetime import utcnow

every_second = 1
every_minute = 60
every_hour = 3600
every_day = 86400
every_week = 604800

def now():

    return utcnow()

def set_interval(func, args, time):

    def wrapper():
        set_interval(func, args, time)
        func(args)

    Timer(time, wrapper).start()
