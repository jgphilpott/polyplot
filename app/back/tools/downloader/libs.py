from urllib.request import urlretrieve

def get_js_libs(js_libs_dir):

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", "{}/jquery.js".format(js_libs_dir))

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js", "{}/d3.js".format(js_libs_dir))

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js", "{}/three.js".format(js_libs_dir))
    urlretrieve("https://threejs.org/examples/js/controls/OrbitControls.js", "{}/orbitControls.js".format(js_libs_dir))

def get_libs(app_folder):

    libs_dir = app_folder + "/libs/vendor"
    js_libs_dir = libs_dir + "/js"

    try:

        get_js_libs(js_libs_dir)

    except:

        pass
