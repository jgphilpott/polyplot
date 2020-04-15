import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"

import {addErrorPanel} from "../../../libs/mjs/panels/error.mjs"
import {addMenuPanel} from "../../../libs/mjs/panels/menu.mjs"

$(document).ready(function() {

  summonParticleWeb(42, rainbow)

  addErrorPanel()
  addMenuPanel()

})
