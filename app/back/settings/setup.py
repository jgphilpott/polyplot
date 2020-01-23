from os import urandom
from sass import compile
from back.routes.blueprints import register
from back.tools.download.libs import get_libs

def config(app):

    compile(dirname=("app/front/sass", "app/front/css"))
    app.config["SECRET_KEY"] = urandom(42).hex()
    app.jinja_env.auto_reload = True
    register(app)
    get_libs()
