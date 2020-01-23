from urllib.request import urlretrieve

def get_libs():

    libs_dir = "app/front/js/libs"

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", "{}/jquery.js".format(libs_dir))

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js", "{}/d3.js".format(libs_dir))

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js", "{}/three.js".format(libs_dir))
    urlretrieve("https://threejs.org/examples/js/controls/OrbitControls.js", "{}/orbitControls.js".format(libs_dir))
