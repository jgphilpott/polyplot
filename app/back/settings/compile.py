from sass import compile

def compile_all(path):

    compile_sass(path)

def compile_sass(path):

    compile(dirname=(path, path), output_style="compressed")
