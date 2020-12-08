class City():

    def __init__(self, city):

        self.country = city["country"]
        self.geometry = city["geometry"]
        self.id = city["id"]
        self.pop_avg = city["pop_avg"]
        self.pop_max = city["pop_max"]
        self.pop_min = city["pop_min"]
        self.rank = city["rank"]
        self.type = city["type"]
        self.wiki = city["wiki"]
        self.zone = city["zone"]
