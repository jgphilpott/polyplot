class Road():

    def __init__(self, road):

        self.category = road["category"]
        self.country = road["country"]
        self.geometry = road["geometry"]
        self.id = road["id"]
        self.jurisdiction = road["jurisdiction"]
        self.label = road["label"]
        self.length_km = road["length_km"]
        self.name = road["name"]
        self.rank = road["rank"]
        self.toll = road["toll"]
        self.type = road["type"]
