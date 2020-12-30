from os import urandom

class Client():

    def __init__(self, client):

        if "id" in client:

            self.id = client["id"]

        self.email = client["email"]
        self.password = client["password"]

        if "settings" in client:

            self.settings = client["settings"]

        else:

            self.settings = {

                "panels": {
                    "countries": False,
                    "indicators": False,
                    "layers": False,
                    "legend": True,
                    "line": True,
                    "map": True,
                    "meta": True,
                    "time": True,
                    "title": True
                },

                "general": {
                    "rotation": False
                },

                "poly3": {
                    "caps": True
                },

                "poly2": {
                    "crosshairs": True
                },

                "map": {
                    "airports": False,
                    "cities": True,
                    "graticules": False,
                    "lakes": True,
                    "ports": False,
                    "railroads": False,
                    "rivers": True,
                    "roads": False
                }

            }

    def refresh_id(self):

        self.id = urandom(42).hex()

        return self

    def update_settings(self, category, setting, value):

        self.settings[category][setting] = value

        return self
