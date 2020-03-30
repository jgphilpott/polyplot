from sass import compile

def compile_sass(path):

    compile(dirname=(path, path))

def compile_all(path):

    compile_sass(path)
