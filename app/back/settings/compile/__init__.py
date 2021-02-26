import subprocess
from sass import compile

def compile_all(path):

    compile_sass(path)

    subprocess.Popen(["boussole", "watch"], cwd="app/back/settings/compile")

def compile_sass(path):

    compile(dirname=(path, path), output_style="compressed")
