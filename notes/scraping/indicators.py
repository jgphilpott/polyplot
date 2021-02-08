import re
import time
import json
from requests import get
from bs4 import BeautifulSoup
from pprint import pprint as pp
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options

index = 1
options = Options()
options.headless = True
browser = Firefox(executable_path="/usr/local/bin/geckodriver", options=options)

with open("/home/jacob/Documents/projects/polyplot/app/back/mongo/backups/json/indicators.json", "r") as file:
    indicators = json.load(file)

# indicators = indicators[:]

for indicator in indicators:

    pp(str(index) + ": " + indicator["name"])
    data = {"code": indicator["code"], "index": index}

    url = "https://data.worldbank.org/indicator/" + indicator["code"]

    try:

        browser.get(url)
        browser.find_element_by_xpath('//*[@id="mainChart"]/section/nav/div[2]/button[2]').click()

        time.sleep(10)

        soup = BeautifulSoup(browser.page_source)
        modal_box = soup.find("div", {"class": "modalBox"})
        sections = modal_box.findAll("li")

        for section in sections:

            title = re.sub(r'[^a-zA-Z ]+', "", section.find("em").text).strip() if section.find("em") is not None else ""
            content = section.find("span").text.strip() if section.find("span") is not None else ""

            if title == "Long Definition": data["description"] = content
            if title == "Development Relevance": data["relevance"] = content
            if title == "Limitations and Exceptions": data["limitations"] = content
            if title == "Statistical Concept and Methodology": data["methodology"] = content

    except:

        pass

    index += 1

    with open("/home/jacob/Documents/projects/polyplot/app/back/mongo/backups/json/temp.json", "a") as file:

        json.dump(data, file, indent=2, sort_keys=True)
        file.write(", ")
