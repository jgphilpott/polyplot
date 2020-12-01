class Airport():

    def __init__(self, airport):

        self.code = airport["code"]
        self.country = airport["country"]
        self.flow = airport["flow"]
        self.latitude = airport["latitude"]
        self.longitude = airport["longitude"]
        self.name = airport["name"]
