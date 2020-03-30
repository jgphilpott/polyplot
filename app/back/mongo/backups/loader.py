from threading import Thread

from back.mongo.backups.js import load_js
from back.mongo.backups.json import load_json
from back.mongo.backups.sass import load_sass

def load_all(path):

    Thread(target=load_js, args=(path,)).start()
    Thread(target=load_json, args=(path,)).start()
    Thread(target=load_sass, args=(path,)).start()
