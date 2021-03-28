class Road():

    def __init__(self, road):

        self.geometry = road["geometry"]
        self.properties = road["properties"]
        self.type = road["type"]
