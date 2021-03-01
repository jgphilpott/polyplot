from threading import Thread, Timer
from multiprocessing import Process

second = 1
minute = 60
hour = 3600
day = 86400
week = 604800
month = 2629800
year = 31557600

def Interval(function, interval):

    def wrapper():

        Interval(function, interval)
        function()

    Timer(interval, wrapper).start()
