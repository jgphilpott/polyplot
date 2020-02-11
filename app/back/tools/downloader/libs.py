from os import makedirs
from os.path import exists
from urllib.request import urlretrieve

def get_js_libs(js_libs_dir):

    if not exists(js_libs_dir):

        makedirs(js_libs_dir)

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", js_libs_dir + "/jQuery.js")
    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js", js_libs_dir + "/jQueryUI.js")

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js", js_libs_dir + "/d3.js")

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js", js_libs_dir + "/three.js")
    urlretrieve("https://raw.githubusercontent.com/jeromeetienne/threex.domevents/1100828c40df668a82a97c811895918088cc607f/threex.domevents.js", js_libs_dir + "/threeX.js")
    urlretrieve("https://raw.githubusercontent.com/mrdoob/three.js/23f814719b2d199e324448751862f2a5fc7d27a5/examples/js/controls/OrbitControls.js", js_libs_dir + "/orbitControls.js")

    urlretrieve("https://raw.githubusercontent.com/jgphilpott/particleWeb/master/particleWeb.js", js_libs_dir + "/particleWeb.js")

def get_sass_libs(sass_libs_dir):

    if not exists(sass_libs_dir):

        makedirs(sass_libs_dir)

def get_libs(app_folder):

    libs_dir = app_folder + "/libs"
    js_libs_dir = libs_dir + "/mjs/vendor"
    sass_libs_dir = libs_dir + "/sass/vendor"

    try:

        get_js_libs(js_libs_dir)
        get_sass_libs(sass_libs_dir)

    except:

        pass
