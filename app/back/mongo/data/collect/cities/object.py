class City():

    def __init__(self, city):

        self.geometry = city["geometry"]
        self.properties = city["properties"]
        self.type = city["type"]
