from back.settings.config import config
from back.settings.routes import register
from back.settings.compile import compile_all
from back.mongo.backups.loader import load_all

def setup(app, app_folder):

    app = register(config(app))
    compile_all(app_folder)
    load_all(app_folder)

    return app
