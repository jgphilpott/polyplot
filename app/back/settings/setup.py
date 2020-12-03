from back.settings.config import config
from back.settings.routes import register_routes
from back.settings.compile import compile_all
from back.mongo.backups.loader import load_data

def setup(app, path):

    app = register_routes(config(app))

    compile_all(path)
    load_data(path)

    return app
