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

            self.settings = {"crosshairs": True}

    def refresh_id(self):

        self.id = urandom(42).hex()

        return self

    def settings_update(self, setting, value):

        self.settings[setting] = value

        return self
