from os import makedirs
from os.path import exists

def load_sass(path):

    path += "/libs/sass/vendor"

    if not exists(path):

        makedirs(path)
