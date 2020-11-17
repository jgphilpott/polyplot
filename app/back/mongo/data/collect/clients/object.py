from os import urandom

class Client():

    def __init__(self, client):

        self.email = client["email"]
        self.password = client["password"]

        if "id" in client:

            self.id = client["id"]

    def refresh_id(self):

        self.id = urandom(42).hex()

        return self
