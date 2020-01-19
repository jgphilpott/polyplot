from flask import Flask, render_template
from sass import compile

from json import load
from os import getcwd

with open(getcwd() + "/app/db/fertility.json") as json_file:
    fertility = load(json_file)

with open(getcwd() + "/app/db/lifeExpectancy.json") as json_file:
    lifeExpectancy = load(json_file)

with open(getcwd() + "/app/db/population.json") as json_file:
    population = load(json_file)

app = Flask("iGraph", template_folder="app", static_folder="app")

@app.route("/")
def home():
    return render_template("html/home.html", myData=fertility)

if __name__ == "__main__":
    compile(dirname=("app/sass", "app/css"))
    app.jinja_env.auto_reload = True
    app.run(host="0.0.0.0", port=5000, debug=True)
