from os import urandom
from sass import compile
from tools.download import get_js_libs
from routes.blueprints import register_routes

def config(app):

    compile(dirname=("app/sass", "app/css"))
    app.config["SECRET_KEY"] = urandom(42).hex()
    app.jinja_env.auto_reload = True
    register_routes(app)
    get_js_libs()
