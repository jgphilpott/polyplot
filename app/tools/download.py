from urllib.request import urlretrieve

def get_js_libs():

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", "app/js/libs/jquery.js")

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js", "app/js/libs/d3.js")

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js", "app/js/libs/three.js")
    urlretrieve("https://threejs.org/examples/js/controls/OrbitControls.js", "app/js/libs/orbitControls.js")
