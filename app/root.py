from flask import Flask

from back.settings.setup import setup
from back.settings.launch import launch

name = "Polyplot"

app_folder = "app/front"

app = Flask(name, template_folder=app_folder, static_folder=app_folder)

polyplot = setup(app, app_folder)

launch(polyplot)
