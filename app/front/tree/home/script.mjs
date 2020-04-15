import {rainbow} from "../../libs/mjs/colors/solid/rainbow.mjs"

import {addHomePanel} from "../../libs/mjs/panels/home.mjs"
import {addMenuPanel} from "../../libs/mjs/panels/menu.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  addHomePanel()
  addMenuPanel()

})
