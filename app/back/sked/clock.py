from threading import Timer

second = 1
minute = 60
hour = 3600
day = 86400
week = 604800
month = 2629800
year = 31557600

def set_interval(function, interval):

    def wrapper():

        set_interval(function, interval)
        function()

    Timer(interval, wrapper).start()
