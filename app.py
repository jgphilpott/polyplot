from flask import Flask

app = Flask(__name__)

@app.route("/")
def root():
    return "Welcome to iGraph!"

if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.run(host="0.0.0.0")
