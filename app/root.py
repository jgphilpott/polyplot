from flask import Flask

from back.settings.setup import setup
from back.settings.launch import launch

name = "Polyplot"
folder = "app/front"

app = Flask(name, template_folder=folder, static_folder=folder)

polyplot = setup(app, folder)

launch(polyplot)
