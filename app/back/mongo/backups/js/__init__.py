from os import makedirs
from os.path import exists

from requests import get
from urllib.request import urlretrieve

def load_js(path):

    path += "/libs/mjs/vendor"

    if not exists(path):

        makedirs(path)

        urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js", path + "/sha256.js")

        urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js", path + "/socket.js")

        urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", path + "/jQuery.js")

        urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js", path + "/d3.js")

        urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js", path + "/three.js")
        urlretrieve("https://raw.githubusercontent.com/jeromeetienne/threex.domevents/1100828c40df668a82a97c811895918088cc607f/threex.domevents.js", path + "/threeX.js")

        particleWeb = get("https://raw.githubusercontent.com/jgphilpott/particleWeb/bd00fb4eaf1b8abeb0f3f720f3f938f9d5b5c772/particleWeb.js").content.decode("utf-8")
        camalize = get("https://gist.githubusercontent.com/jgphilpott/19e7a94cdf6d6d4cd868cc18e628026c/raw/2c5d68bb84f0d4e14478bcac359a77137f6a25f5/camalize.js").content.decode("utf-8")
        rotation = get("https://gist.githubusercontent.com/jgphilpott/1bc17b82063f14fabb8f3e38825f6f10/raw/b5ddf5f386213f47ac4fd4b9f41bc116b37f29a3/rotation.js").content.decode("utf-8")
        scaling = get("https://gist.githubusercontent.com/jgphilpott/6332dc7f5636db9ba455e1575407c496/raw/b72589532af0b7c63e321b15254acbb848248209/scaling.js").content.decode("utf-8")
        d3Sorting = get("https://gist.githubusercontent.com/jgphilpott/cf12c05f7c30844a4d7fa70ec9a7945a/raw/14fbbe992d10c07a467afb4dad2647356238ab3c/d3Sorting.js").content.decode("utf-8")
        cookieFuncs = get("https://gist.githubusercontent.com/jgphilpott/b9ce64b9ef8b04c5ac58902b133b1a28/raw/8931a5cd26c48945e932a7399f853b593687f557/cookieFunctions.js").content.decode("utf-8")
        validEmail = get("https://gist.githubusercontent.com/jgphilpott/a1ffedea1d1a70320b8075597df1943a/raw/29b8f25b2a439a117783523f209ba42ef5e9cf9d/validEmail.js").content.decode("utf-8")
        localStorage = get("https://gist.githubusercontent.com/jgphilpott/e26b92eb41b64e9565032d5c4d3c2878/raw/593ae1721ca986210862da158db663f21dec42af/localStorage.js").content.decode("utf-8")
        angles = get("https://gist.githubusercontent.com/jgphilpott/092c0f3e1bcfa75f543e8485b9b23e7d/raw/813b2b7ac4c3cbcfc5caec5eec3600bba3bf5edc/angleConverter.js").content.decode("utf-8")
        trig = get("https://gist.githubusercontent.com/jgphilpott/1378cc2cccde6d65c5fb2b6111b5a98f/raw/587408f905ba1da6fcc970cb095bdf129ffa308b/trigonometry.js").content.decode("utf-8")
        format = get("https://gist.githubusercontent.com/jgphilpott/787659ac4ea57a9971da58a76191079b/raw/aa02b0fef92e1d626f2d36dbec70e37ff3a6b5aa/numberFormater.js").content.decode("utf-8")

        tools = particleWeb + "\n" + camalize + "\n" + rotation + "\n" + scaling + "\n" + d3Sorting + "\n" + cookieFuncs + "\n" + validEmail + "\n" + localStorage + "\n" + angles + "\n" + trig + "\n" + format

        with open(path + "/tools.js", "w") as file:

            file.write(tools)
