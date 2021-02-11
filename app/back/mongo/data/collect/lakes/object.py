class Lake():

    def __init__(self, lake):

        self.geometry = lake["geometry"]
        self.properties = lake["properties"]
        self.type = lake["type"]
