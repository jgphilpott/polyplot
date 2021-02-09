import re
import json
from requests import get
from bs4 import BeautifulSoup
from pprint import pprint as pp

url = "https://www.cia.gov/the-world-factbook/field/background"

html = get(url).content.decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

content_div = soup.find("div", {"class": "content-area-content"})
countries = content_div.findAll("li")

data = []

for country in countries:

    link = "https://www.cia.gov" + country.find("a")["href"].strip()
    name = country.find("h3").text.strip()
    description = []

    # if name == "Brunei": name = "Brunei Darussalam"
    # if name == "Burma": name = "Myanmar"
    # if name == "Czechia": name = "Czech Republic"
    # if name == "Micronesia, Federated States of": name = "Micronesia"

    for p in country.findAll("p"):

        try:

            p = p.text.strip()

            if p != "":

                description.append(p)

        except:

            pass

    data.append({"link": link, "name": name, "description": description})
