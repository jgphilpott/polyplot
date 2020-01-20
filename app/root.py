from flask import Flask, render_template
from sass import compile
import data

app = Flask("iGraph", template_folder="app", static_folder="app")

@app.route("/")
def home():
    return render_template("html/home.html")

if __name__ == "__main__":
    compile(dirname=("app/sass", "app/css"))
    app.jinja_env.auto_reload = True
    app.run(host="0.0.0.0", port=5000, debug=True)
