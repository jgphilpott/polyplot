### Sources ###

# Religions by country: https://en.wikipedia.org/wiki/Religions_by_country
# Major religious groups: https://en.wikipedia.org/wiki/Major_religious_groups
# List of religious populations: https://en.wikipedia.org/wiki/List_of_religious_populations

import re
import ast
import numpy as np
from requests import get
from bs4 import BeautifulSoup

url = "https://en.wikipedia.org/wiki/Religions_by_country"
html = get(url).content.decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

# World

world_religions = []
world_data = soup.select("#mw-content-text > div.mw-parser-output > table:nth-child(10) > tbody > tr:nth-child(2) > td > div > table")

religion_names = [religion.getText().split("Population", 1)[0].strip() for religion in world_data[0].findAll("th")[2:]]

religion_data = [re.sub("[^0-9^.]", "", religion.getText()) for religion in world_data[0].findAll("tr")[1].findAll("td")]
religion_data = np.array_split(religion_data[2:], len(religion_data[2:]) / 2)

population_sum = 0
percent_sum = 0

for i, religion in enumerate(religion_names):

    population = ast.literal_eval(religion_data[i][0])
    percent = ast.literal_eval(religion_data[i][1])

    population_sum += population
    percent_sum += percent

    world_religions.append({"name": religion, "population": population, "percent": percent})
