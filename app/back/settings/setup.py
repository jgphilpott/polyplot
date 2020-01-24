from back.settings.env import config
from back.settings.routes import register
from back.settings.compile import compile_all
from back.tools.downloader.libs import get_libs

def setup(app, app_folder):

    app = config(app)
    app = register(app)
    get_libs(app_folder)
    compile_all(app_folder)

    return app
