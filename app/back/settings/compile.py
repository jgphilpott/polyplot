from sass import compile

def compile_sass(app_folder):

    compile(dirname=(app_folder, app_folder))

def compile_all(app_folder):

    compile_sass(app_folder)
