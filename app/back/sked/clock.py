from threading import Timer

every_second = 1
every_minute = 60
every_hour = 3600
every_day = 86400
every_week = 604800
every_month = 2628000
every_year = 31536000

def set_interval(function, interval):

    def wrapper():

        set_interval(function, interval)
        function()

    Timer(interval, wrapper).start()
