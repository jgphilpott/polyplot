class Airport():

    def __init__(self, airport):

        self.geometry = airport["geometry"]
        self.properties = airport["properties"]
        self.type = airport["type"]
