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
    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js", path + "/jQueryUI.js")

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js", path + "/d3.js")

    urlretrieve("https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js", path + "/three.js")
    urlretrieve("https://raw.githubusercontent.com/jeromeetienne/threex.domevents/1100828c40df668a82a97c811895918088cc607f/threex.domevents.js", path + "/threeX.js")
    urlretrieve("https://raw.githubusercontent.com/mrdoob/three.js/23f814719b2d199e324448751862f2a5fc7d27a5/examples/js/controls/OrbitControls.js", path + "/orbitControls.js")

    particleWeb = get("https://raw.githubusercontent.com/jgphilpott/particleWeb/6b3cf31aa51ce901d4d9e00b47eef5ef656efe2b/particleWeb.js").content.decode("utf-8")
    camalize = get("https://gist.githubusercontent.com/jgphilpott/19e7a94cdf6d6d4cd868cc18e628026c/raw/2c5d68bb84f0d4e14478bcac359a77137f6a25f5/camalize.js").content.decode("utf-8")
    rotation = get("https://gist.githubusercontent.com/jgphilpott/1bc17b82063f14fabb8f3e38825f6f10/raw/b5ddf5f386213f47ac4fd4b9f41bc116b37f29a3/rotation.js").content.decode("utf-8")
    scaling = get("https://gist.githubusercontent.com/jgphilpott/6332dc7f5636db9ba455e1575407c496/raw/b72589532af0b7c63e321b15254acbb848248209/scaling.js").content.decode("utf-8")
    d3Sorting = get("https://gist.githubusercontent.com/jgphilpott/cf12c05f7c30844a4d7fa70ec9a7945a/raw/284edcf4d44050d1b70cc21230433097b2d19cfd/d3Sorting.js").content.decode("utf-8")

    tools = particleWeb + "\n" + camalize + "\n" + rotation + "\n" + scaling + "\n" + d3Sorting

    with open(path + "/tools.js", "w") as file:

        file.write(tools)
