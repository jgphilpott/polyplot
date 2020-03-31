from back.mongo.backups.js import load_js
from back.mongo.backups.json import load_json
from back.mongo.backups.sass import load_sass

def load_all(path):

    load_js(path)
    load_json(path)
    load_sass(path)
